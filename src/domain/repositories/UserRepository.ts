import { Order } from '../entities/Order';
import { User } from '../entities/User';

export interface UserRepository {
  create(data: { name: string; email: string }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findWithOrders(): Promise<Array<User & { orders: Order[] }>>;
  findById(id: number): Promise<User | null>;
}
