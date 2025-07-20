import { User } from "../entities/User";

export interface UserRepository {
  create(data: { name: string; email: string }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findWithOrders(): Promise<Array<User & { orders: any[] }>>;
  findById(id: number): Promise<User | null>;
}
