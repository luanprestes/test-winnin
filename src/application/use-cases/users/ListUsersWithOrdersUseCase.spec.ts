import { ListUsersWithOrdersUseCase } from "@/application/use-cases/users/ListUsersWithOrdersUseCase";

describe("ListUsersWithOrdersUseCase", () => {
  const mockUserRepo = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    findWithOrders: jest.fn(),
  };

  const mockOrderRepo = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    findById: jest.fn(),
    findItemsByOrderId: jest.fn(),
    findByUserId: jest.fn(),
  };

  const useCase = new ListUsersWithOrdersUseCase(mockUserRepo, mockOrderRepo);

  it("deve retornar usuários com seus pedidos", async () => {
    mockUserRepo.findAll.mockResolvedValue([
      {
        id: 1,
        name: "Luan",
        email: "luan@teste.com",
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Joana",
        email: "joana@teste.com",
        createdAt: new Date(),
      },
    ]);

    mockOrderRepo.findAll.mockResolvedValue([
      {
        id: 10,
        userId: 1,
        total: 100,
        createdAt: new Date(),
        items: [],
      },
      {
        id: 11,
        userId: 2,
        total: 200,
        createdAt: new Date(),
        items: [],
      },
      {
        id: 12,
        userId: 1,
        total: 300,
        createdAt: new Date(),
        items: [],
      },
    ]);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].orders).toHaveLength(2);
    expect(result[1].orders).toHaveLength(1);
  });
});
