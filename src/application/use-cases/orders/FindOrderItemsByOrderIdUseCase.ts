import { OrderItem } from '@/domain/entities/OrderItem';
import { OrderRepository } from '@/domain/repositories/OrderRepository';

export class FindOrderItemsByOrderIdUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: number): Promise<OrderItem[]> {
    return this.orderRepository.findItemsByOrderId(orderId);
  }
}
