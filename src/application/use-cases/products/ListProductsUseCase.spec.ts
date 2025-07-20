import { ListProductsUseCase } from "@/application/use-cases/products/ListProductsUseCase";
import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Product } from "@/domain/entities/Product";

describe("ListProductsUseCase", () => {
  const mockProductRepo = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  } as unknown as jest.Mocked<ProductRepository>;

  const useCase = new ListProductsUseCase(mockProductRepo);

  it("deve retornar todos os produtos cadastrados", async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Produto 1",
        price: 100,
        createdAt: new Date(),
        stock: 0,
      },
      {
        id: 2,
        name: "Produto 2",
        price: 200,
        createdAt: new Date(),
        stock: 0,
      },
    ];

    mockProductRepo.findAll.mockResolvedValue(mockProducts);

    const result = await useCase.execute();

    expect(mockProductRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });
});
