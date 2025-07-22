import { CreateOrderInput } from "@/application/dtos/CreateOrderInput";
import { CreateOrderOutput } from "@/application/dtos/CreateOrderOutput";
import { InsufficientStockError } from "@/application/errors/InsufficientStockError";
import { ProductNotFoundError } from "@/application/errors/ProductNotFoundError";
import { Product } from "@/domain/entities/Product";
import { OrderRepository } from "@/domain/repositories/OrderRepository";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Transactional } from "@/domain/repositories/Transactional";

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly productRepo: ProductRepository,
    private readonly transactional: Transactional
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    return await this.transactional.runInTransaction(async () => {
      const products = await this.productRepo.findManyByIds(
        input.items.map((item) => item.productId)
      );

      const productMap = new Map(products?.map((p: Product) => [p.id, p]));

      for (const item of input.items) {
        const product = productMap.get(item.productId);
        if (!product) throw new ProductNotFoundError(item.productId);
        if (product.stock < item.quantity) {
          throw new InsufficientStockError(item.productId);
        }
      }

      for (const item of input.items) {
        const updated = await this.productRepo.updateStockIfEnough(
          item.productId,
          item.quantity
        );

        if (!updated) {
          throw new InsufficientStockError(item.productId);
        }
      }

      const itemsWithPrice = input.items.map((item) => {
        const product = productMap.get(item.productId)!;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      });

      const total = itemsWithPrice.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const order = await this.orderRepo.create({
        userId: input.userId,
        total,
        items: itemsWithPrice,
      });

      return {
        id: order.id,
        userId: order.userId,
        total: order.total,
        createdAt: order.createdAt,
        items: order.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      };
    });
  }
}
