import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { Product } from '@/domain/entities/Product';

export class ListProductsUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepo.findAll();
  }
}
