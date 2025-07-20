import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Product } from "@/domain/entities/Product";

interface Input {
  name: string;
  price: number;
  stock: number;
}

export class CreateProductUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(input: Input): Promise<Product> {
    return this.productRepo.create(input);
  }
}
