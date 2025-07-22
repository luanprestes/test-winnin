import { PrismaClient } from '@prisma/client';
import { PrismaOrderRepository } from '@/infra/prisma/PrismaOrderRepository';
import { PrismaProductRepository } from '@/infra/prisma/PrismaProductRepository';
import { CreateOrderUseCase } from '@/application/use-cases/orders/CreateOrderUseCase';
import { PrismaTransactionAdapter } from '@/infra/prisma/PrismaTransactionAdapter';

const prisma = new PrismaClient();

describe('Race condition test - real DB', () => {
  const orderRepo = new PrismaOrderRepository();
  const productRepo = new PrismaProductRepository();
  const transactional = new PrismaTransactionAdapter();
  const useCase = new CreateOrderUseCase(orderRepo, productRepo, transactional);

  beforeEach(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        id: 1,
        name: 'Usuário Teste',
        email: 'email@email.com',
      },
    });

    await prisma.product.create({
      data: {
        id: 1,
        name: 'Produto Teste',
        price: 100,
        stock: 1,
      },
    });
  });

  it('deve permitir apenas um pedido com o último item em estoque', async () => {
    const input = {
      userId: 1,
      items: [{ productId: 1, quantity: 1 }],
    };

    const results = await Promise.allSettled([
      useCase.execute(input),
      useCase.execute(input),
    ]);

    const fulfilled = results.filter((r) => r.status === 'fulfilled');
    const rejected = results.filter((r) => r.status === 'rejected');

    expect(fulfilled.length).toBe(1);
    expect(rejected.length).toBe(1);
    expect(rejected[0]).toMatchObject({
      status: 'rejected',
      reason: expect.any(Error),
    });
  });
});
