import { Product } from '../entities/Product';

export interface ProductRepository {
  findManyByIds(id: number[]): Promise<Product[] | null>;
  create(data: {
    name: string;
    price: number;
    stock: number;
  }): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  updateStock(id: number, newStock: number): Promise<void>;
  updateStockIfEnough(productId: number, quantity: number): Promise<boolean>;
}
