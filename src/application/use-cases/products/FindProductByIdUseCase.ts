import { ProductRepository } from "@/domain/repositories/ProductRepository";
import { Product } from "@/domain/entities/Product";

export class FindProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: number): Promise<Product | null> {
    return this.productRepository.findById(productId);
  }
}
