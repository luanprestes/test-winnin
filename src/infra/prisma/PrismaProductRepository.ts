import { prisma } from './client';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { Product } from '@/domain/entities/Product';
import { Product as ProductPrisma } from '@prisma/client';

const mapToEntity = (product: ProductPrisma): Product => ({
  id: product.id,
  name: product.name,
  price: product.price.toNumber(),
  stock: product.stock,
  createdAt: product.createdAt,
});

export class PrismaProductRepository implements ProductRepository {
  async create(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const product = await prisma.product.create({
      data,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        createdAt: true,
      },
    });

    return mapToEntity(product);
  }

  async findById(id: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        createdAt: true,
      },
    });

    return product ? mapToEntity(product) : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        createdAt: true,
      },
    });

    return products.map(mapToEntity);
  }

  async updateStock(id: number, newStock: number): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  }

  async updateStockIfEnough(
    productId: number,
    quantity: number,
  ): Promise<boolean> {
    const result = await prisma.product.updateMany({
      where: {
        id: productId,
        stock: { gte: quantity },
      },
      data: {
        stock: { decrement: quantity },
      },
    });

    return result.count > 0;
  }

  async findManyByIds(ids: number[]): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        id: { in: ids },
      },
    });

    return products.map(mapToEntity);
  }
}
