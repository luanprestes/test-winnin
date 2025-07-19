import { Product } from "../entities/Product";

export interface ProductRepository {
  create(data: {
    name: string;
    price: number;
    stock: number;
  }): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  updateStock(id: number, newStock: number): Promise<void>;
}
