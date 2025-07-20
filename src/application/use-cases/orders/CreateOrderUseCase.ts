import { OrderRepository } from "@/domain/repositories/OrderRepository";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { CreateOrderInput } from "@/application/dtos/CreateOrderInput";
import { CreateOrderProps } from "@/domain/entities/Order";
import { CreateOrderOutput } from "@/application/dtos/CreateOrderOutput";
import { InsufficientStockError } from "@/application/errors/InsufficientStockError";
import { ProductNotFoundError } from "@/application/errors/ProductNotFoundError";

export class CreateOrderUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private productRepo: ProductRepository
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const products = await Promise.all(
      input.items.map((item) => this.productRepo.findById(item.productId))
    );

    for (let i = 0; i < input.items.length; i++) {
      const product = products[i];
      const item = input.items[i];
      if (!product) throw new ProductNotFoundError(item.productId);
      if (product.stock < item.quantity)
        throw new InsufficientStockError(item.productId);
    }

    for (let i = 0; i < input.items.length; i++) {
      const product = products[i]!;
      const item = input.items[i];
      await this.productRepo.updateStock(
        product.id,
        product.stock - item.quantity
      );
    }

    const total = input.items.reduce(
      (sum, item, i) => sum + products[i]!.price * item.quantity,
      0
    );

    const createDto: CreateOrderProps = {
      userId: input.userId,
      total,
      items: input.items.map((item, i) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: products[i]!.price,
      })),
    };

    const order = await this.orderRepo.create(createDto);

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
  }
}
