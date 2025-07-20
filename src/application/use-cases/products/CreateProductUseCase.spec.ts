import { CreateProductUseCase } from "@/application/use-cases/products/CreateProductUseCase";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Product } from "@/domain/entities/Product";

describe("CreateProductUseCase", () => {
  const mockProductRepo = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  } as unknown as jest.Mocked<ProductRepository>;

  const useCase = new CreateProductUseCase(mockProductRepo);

  it("deve criar um novo produto com os dados fornecidos", async () => {
    const input = {
      name: "Produto Teste",
      price: 199.99,
      stock: 10,
    };

    const mockProduct: Product = {
      id: 1,
      ...input,
      createdAt: new Date(),
    };

    mockProductRepo.create.mockResolvedValue(mockProduct);

    const result = await useCase.execute(input);

    expect(mockProductRepo.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockProduct);
  });
});
