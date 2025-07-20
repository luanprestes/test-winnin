import { Order, CreateOrderProps } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";

export interface OrderRepository {
  create(data: CreateOrderProps): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findItemsByOrderId(orderId: number): Promise<OrderItem[]>;
  findByUserId(userId: number): Promise<Order[]>;
}
