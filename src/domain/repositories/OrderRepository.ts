import { Order } from "../entities/Order";

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}
