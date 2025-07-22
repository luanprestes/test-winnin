import { FindOrdersByUserIdUseCase } from '@/application/use-cases/orders/FindOrdersByUserIdUseCase';
import { OrderRepository } from '@/domain/repositories/OrderRepository';
import { Order } from '@/domain/entities/Order';

describe('FindOrdersByUserIdUseCase', () => {
  const mockOrderRepo: jest.Mocked<OrderRepository> = {
    findByUserId: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findItemsByOrderId: jest.fn(),
    create: jest.fn(),
  };

  const useCase = new FindOrdersByUserIdUseCase(mockOrderRepo);

  it('deve retornar os pedidos de um usuário específico', async () => {
    const userId = 1;

    const orders: Order[] = [
      {
        id: 101,
        userId,
        total: 150,
        createdAt: new Date(),
        items: [],
      },
      {
        id: 102,
        userId,
        total: 300,
        createdAt: new Date(),
        items: [],
      },
    ];

    mockOrderRepo.findByUserId.mockResolvedValue(orders);

    const result = await useCase.execute(userId);

    expect(mockOrderRepo.findByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(orders);
  });
});
