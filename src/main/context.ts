import { PrismaUserRepository } from "@/infra/prisma/PrismaUserRepository";
import { PrismaProductRepository } from "@/infra/prisma/PrismaProductRepository";
import { PrismaOrderRepository } from "@/infra/prisma/PrismaOrderRepository";

import { CreateUserUseCase } from "@/application/use-cases/users/CreateUserUseCase";
import { ListUsersWithOrdersUseCase } from "@/application/use-cases/users/ListUsersWithOrdersUseCase";
import { CreateProductUseCase } from "@/application/use-cases/products/CreateProductUseCase";
import { ListProductsUseCase } from "@/application/use-cases/products/ListProductsUseCase";
import { CreateOrderUseCase } from "@/application/use-cases/orders/CreateOrderUseCase";

export function createContext() {
  const userRepository = new PrismaUserRepository();
  const productRepository = new PrismaProductRepository();
  const orderRepository = new PrismaOrderRepository();

  return {
    useCases: {
      createUser: new CreateUserUseCase(userRepository),
      listUsersWithOrders: new ListUsersWithOrdersUseCase(
        userRepository,
        orderRepository
      ),
      createProduct: new CreateProductUseCase(productRepository),
      listProducts: new ListProductsUseCase(productRepository),
      createOrder: new CreateOrderUseCase(orderRepository, productRepository),
    },
  };
}

export type Context = ReturnType<typeof createContext>;
