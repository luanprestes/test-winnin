import { CreateOrderUseCase } from "@/application/use-cases/orders/CreateOrderUseCase";
import { OrderRepository } from "@/domain/repositories/OrderRepository";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { CreateOrderInput } from "@/application/dtos/CreateOrderInput";

describe("CreateOrderUseCase", () => {
  const mockOrderRepo: jest.Mocked<OrderRepository> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByUserId: jest.fn(),
    findItemsByOrderId: jest.fn(),
  };

  const mockProductRepo: jest.Mocked<ProductRepository> = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    updateStock: jest.fn(),
  };

  const useCase = new CreateOrderUseCase(mockOrderRepo, mockProductRepo);

  it("deve criar um pedido com sucesso", async () => {
    const input: CreateOrderInput = {
      userId: 1,
      items: [
        { productId: 101, quantity: 2 },
        { productId: 102, quantity: 1 },
      ],
    };

    mockProductRepo.findById
      .mockResolvedValueOnce({
        id: 101,
        name: "Produto A",
        price: 50,
        stock: 5,
        createdAt: new Date(),
      })
      .mockResolvedValueOnce({
        id: 102,
        name: "Produto B",
        price: 100,
        stock: 3,
        createdAt: new Date(),
      });

    mockProductRepo.updateStock.mockResolvedValue();

    const mockDate = new Date();
    mockOrderRepo.create.mockResolvedValue({
      id: 1,
      userId: 1,
      total: 200,
      createdAt: mockDate,
      items: [
        { id: 1, orderId: 1, productId: 101, quantity: 2, price: 50 },
        { id: 2, orderId: 1, productId: 102, quantity: 1, price: 100 },
      ],
    });

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: 1,
      userId: 1,
      total: 200,
      createdAt: mockDate,
      items: [
        { productId: 101, quantity: 2, price: 50 },
        { productId: 102, quantity: 1, price: 100 },
      ],
    });

    expect(mockProductRepo.findById).toHaveBeenCalledTimes(2);
    expect(mockProductRepo.updateStock).toHaveBeenCalledTimes(2);
    expect(mockOrderRepo.create).toHaveBeenCalled();
  });

  it("deve lançar erro se produto não existir", async () => {
    const input: CreateOrderInput = {
      userId: 1,
      items: [{ productId: 999, quantity: 1 }],
    };

    mockProductRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(input)).rejects.toThrow(
      "Product 999 not found"
    );
  });

  it("deve lançar erro se não tiver estoque", async () => {
    const input: CreateOrderInput = {
      userId: 1,
      items: [{ productId: 101, quantity: 10 }],
    };

    mockProductRepo.findById.mockResolvedValue({
      id: 101,
      name: "Produto A",
      price: 50,
      stock: 5,
      createdAt: new Date(),
    });

    await expect(useCase.execute(input)).rejects.toThrow(
      "Insufficient stock for product 101"
    );
  });
});
