import { CreateOrderUseCase } from "@/application/use-cases/orders/CreateOrderUseCase";
import { OrderRepository } from "@/domain/repositories/OrderRepository";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Transactional } from "@/domain/repositories/Transactional";
import { CreateOrderInput } from "@/application/dtos/CreateOrderInput";
import { ProductNotFoundError } from "@/application/errors/ProductNotFoundError";
import { InsufficientStockError } from "@/application/errors/InsufficientStockError";

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
    findManyByIds: jest.fn(),
    updateStockIfEnough: jest.fn(),
  };

  const mockTransactional: jest.Mocked<Transactional> = {
    runInTransaction: jest.fn(),
  };

  const useCase = new CreateOrderUseCase(
    mockOrderRepo,
    mockProductRepo,
    mockTransactional
  );

  it("deve criar um pedido com sucesso", async () => {
    const input: CreateOrderInput = {
      userId: 1,
      items: [
        { productId: 101, quantity: 2 },
        { productId: 102, quantity: 1 },
      ],
    };

    const mockDate = new Date();

    mockProductRepo.findManyByIds.mockResolvedValue([
      { id: 101, name: "Produto A", price: 50, stock: 5, createdAt: mockDate },
      { id: 102, name: "Produto B", price: 100, stock: 3, createdAt: mockDate },
    ]);

    mockProductRepo.updateStockIfEnough.mockResolvedValue(true);
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

    mockTransactional.runInTransaction.mockImplementation(async (fn) => {
      return await fn();
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

    expect(mockProductRepo.findManyByIds).toHaveBeenCalledWith([101, 102]);
    expect(mockProductRepo.updateStockIfEnough).toHaveBeenCalledTimes(2);
    expect(mockOrderRepo.create).toHaveBeenCalled();
    expect(mockTransactional.runInTransaction).toHaveBeenCalled();
  });

  it("deve lançar ProductNotFoundError se algum produto não for encontrado", async () => {
    const input: CreateOrderInput = {
      userId: 1,
      items: [{ productId: 999, quantity: 1 }],
    };

    mockProductRepo.findManyByIds.mockResolvedValue([]);

    mockTransactional.runInTransaction.mockImplementation(async (fn) => {
      return await fn();
    });

    await expect(useCase.execute(input)).rejects.toThrow(
      new ProductNotFoundError(999)
    );
  });

  it("deve lançar InsufficientStockError se não tiver estoque suficiente", async () => {
    const input: CreateOrderInput = {
      userId: 1,
      items: [{ productId: 101, quantity: 10 }],
    };

    mockProductRepo.findManyByIds.mockResolvedValue([
      {
        id: 101,
        name: "Produto A",
        price: 50,
        stock: 5,
        createdAt: new Date(),
      },
    ]);

    mockTransactional.runInTransaction.mockImplementation(async (fn) => {
      return await fn();
    });

    await expect(useCase.execute(input)).rejects.toThrow(
      new InsufficientStockError(101)
    );
  });

  it("deve lançar InsufficientStockError se updateStockIfEnough retornar false", async () => {
    const input: CreateOrderInput = {
      userId: 1,
      items: [{ productId: 101, quantity: 2 }],
    };

    mockProductRepo.findManyByIds.mockResolvedValue([
      {
        id: 101,
        name: "Produto A",
        price: 50,
        stock: 5,
        createdAt: new Date(),
      },
    ]);

    mockProductRepo.updateStockIfEnough.mockResolvedValue(false);

    mockTransactional.runInTransaction.mockImplementation(async (fn) => {
      return await fn();
    });

    await expect(useCase.execute(input)).rejects.toThrow(
      new InsufficientStockError(101)
    );
  });
});
