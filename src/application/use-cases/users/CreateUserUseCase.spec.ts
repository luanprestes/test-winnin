import { CreateUserUseCase } from '@/application/use-cases/users/CreateUserUseCase';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';

describe('CreateUserUseCase', () => {
  const mockUserRepo = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    findWithOrders: jest.fn(),
  } as jest.Mocked<UserRepository>;

  const useCase = new CreateUserUseCase(mockUserRepo);

  it('deve criar um novo usuário com os dados fornecidos', async () => {
    const input = {
      name: 'Maria',
      email: 'maria@teste.com',
    };

    const createdUser: User = {
      id: 1,
      name: input.name,
      email: input.email,
      createdAt: new Date(),
    };

    mockUserRepo.create.mockResolvedValue(createdUser);

    const result = await useCase.execute(input);

    expect(mockUserRepo.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(createdUser);
  });
});
