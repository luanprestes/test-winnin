import { prisma } from "./client";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Product } from "@/domain/entities/Product";

export class PrismaProductRepository implements ProductRepository {
  async create(data: {
    name: string;
    price: number;
    stock: number;
  }): Promise<Product> {
    const product = await prisma.product.create({ data });

    return {
      id: product.id,
      name: product.name,
      price: product.price.toNumber(),
      stock: product.stock,
      createdAt: product.createdAt,
    };
  }

  async findById(id: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      price: product.price.toNumber(),
      stock: product.stock,
      createdAt: product.createdAt,
    };
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price.toNumber(),
      stock: p.stock,
      createdAt: p.createdAt,
    }));
  }

  async updateStock(id: number, newStock: number): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  }
}
