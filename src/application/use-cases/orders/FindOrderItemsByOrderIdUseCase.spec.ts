import { FindOrderItemsByOrderIdUseCase } from '@/application/use-cases/orders/FindOrderItemsByOrderIdUseCase';
import { OrderRepository } from '@/domain/repositories/OrderRepository';
import { OrderItem } from '@/domain/entities/OrderItem';

describe('FindOrderItemsByOrderIdUseCase', () => {
  const mockOrderRepo: jest.Mocked<OrderRepository> = {
    findItemsByOrderId: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByUserId: jest.fn(),
    create: jest.fn(),
  };

  const useCase = new FindOrderItemsByOrderIdUseCase(mockOrderRepo);

  it('deve retornar os itens de um pedido', async () => {
    const orderId = 1;

    const items: OrderItem[] = [
      {
        id: 1,
        orderId,
        productId: 101,
        quantity: 2,
        price: 50,
      },
      {
        id: 2,
        orderId,
        productId: 102,
        quantity: 1,
        price: 100,
      },
    ];

    mockOrderRepo.findItemsByOrderId.mockResolvedValue(items);

    const result = await useCase.execute(orderId);

    expect(mockOrderRepo.findItemsByOrderId).toHaveBeenCalledWith(orderId);
    expect(result).toEqual(items);
  });
});
