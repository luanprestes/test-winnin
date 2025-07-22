import { FindProductByIdUseCase } from '@/application/use-cases/products/FindProductByIdUseCase';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { Product } from '@/domain/entities/Product';

describe('FindProductByIdUseCase', () => {
  const mockProductRepo = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  } as unknown as jest.Mocked<ProductRepository>;

  const useCase = new FindProductByIdUseCase(mockProductRepo);

  it('deve retornar o produto quando encontrado pelo ID', async () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Produto Teste',
      price: 123.45,
      createdAt: new Date(),
      stock: 0,
    };

    mockProductRepo.findById.mockResolvedValue(mockProduct);

    const result = await useCase.execute(1);

    expect(mockProductRepo.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
  });

  it('deve retornar null quando o produto não for encontrado', async () => {
    mockProductRepo.findById.mockResolvedValue(null);

    const result = await useCase.execute(999);

    expect(mockProductRepo.findById).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });
});
