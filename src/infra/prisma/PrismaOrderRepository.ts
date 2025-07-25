import { prisma } from './client';
import { OrderRepository } from '@/domain/repositories/OrderRepository';
import { Order } from '@/domain/entities/Order';
import { OrderItem } from '@/domain/entities/OrderItem';

export class PrismaOrderRepository implements OrderRepository {
  async create(order: Order): Promise<Order> {
    return await prisma.$transaction(async (tx) => {
      const itemsWithPrice: {
        productId: number;
        quantity: number;
        price: number;
      }[] = [];

      for (const item of order.items) {
        const updated = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: {
              gte: item.quantity,
            },
          },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        if (updated.count === 0) {
          throw new Error(
            `Estoque insuficiente para o produto ${item.productId}`,
          );
        }

        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product)
          throw new Error(`Produto ${item.productId} não encontrado`);

        itemsWithPrice.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price.toNumber(),
        });
      }

      const total = itemsWithPrice.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const created = await tx.order.create({
        data: {
          userId: order.userId,
          total,
          items: {
            create: itemsWithPrice,
          },
        },
        include: {
          items: true,
        },
      });

      return {
        id: created.id,
        userId: created.userId,
        total: created.total.toNumber(),
        createdAt: created.createdAt,
        items: created.items.map((item) => ({
          id: item.id,
          orderId: item.orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price.toNumber(),
        })),
      };
    });
  }

  async findById(id: number): Promise<Order | null> {
    const found = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!found) return null;

    return {
      id: found.id,
      userId: found.userId,
      total: found.total.toNumber(),
      createdAt: found.createdAt,
      items: found.items.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.toNumber(),
      })),
    };
  }

  async findAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: { items: true },
    });

    return orders.map((order) => ({
      id: order.id,
      userId: order.userId,
      total: order.total.toNumber(),
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.toNumber(),
      })),
    }));
  }

  async findItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    const items = await prisma.orderItem.findMany({
      where: { orderId },
    });

    return items.map((item) => ({
      id: item.id,
      orderId: item.orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price.toNumber(),
    }));
  }

  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
    });

    return orders.map((order) => ({
      id: order.id,
      userId: order.userId,
      total: order.total.toNumber(),
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.toNumber(),
      })),
    }));
  }
}
