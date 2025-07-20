import { Order, CreateOrderProps } from "../entities/Order";

export interface OrderRepository {
  create(data: CreateOrderProps): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}
