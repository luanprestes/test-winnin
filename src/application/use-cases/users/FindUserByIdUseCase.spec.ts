import { FindUserByIdUseCase } from "@/application/use-cases/users/FindUserByIdUseCase";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

describe("FindUserByIdUseCase", () => {
  const mockUserRepo = {
    findAll: jest.fn(),
    create: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    findWithOrders: jest.fn(),
  } as jest.Mocked<UserRepository>;

  const useCase = new FindUserByIdUseCase(mockUserRepo);

  it("deve retornar um usuário se encontrado pelo ID", async () => {
    const mockUser: User = {
      id: 1,
      name: "Luan",
      email: "luan@teste.com",
      createdAt: new Date(),
    };

    mockUserRepo.findById.mockResolvedValue(mockUser);

    const result = await useCase.execute(1);

    expect(mockUserRepo.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it("deve retornar null se o usuário não for encontrado", async () => {
    mockUserRepo.findById.mockResolvedValue(null);

    const result = await useCase.execute(999);

    expect(mockUserRepo.findById).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });
});
