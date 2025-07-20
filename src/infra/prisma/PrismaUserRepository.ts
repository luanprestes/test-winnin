import { prisma } from "./client";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

export class PrismaUserRepository implements UserRepository {
  async create(data: { name: string; email: string }): Promise<User> {
    return prisma.user.create({
      data,
      include: { orders: true },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findWithOrders(): Promise<Array<User & { orders: any[] }>> {
    return prisma.user.findMany({
      include: {
        orders: {
          include: {
            items: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
