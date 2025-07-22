import { OrderRepository } from '@/domain/repositories/OrderRepository';
import { Order } from '@/domain/entities/Order';

export class FindOrdersByUserIdUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(userId: number): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }
}
