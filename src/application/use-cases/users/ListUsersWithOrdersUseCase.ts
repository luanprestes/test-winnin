import { UserRepository } from '@/domain/repositories/UserRepository';
import { OrderRepository } from '@/domain/repositories/OrderRepository';

export class ListUsersWithOrdersUseCase {
  constructor(
    private userRepo: UserRepository,
    private orderRepo: OrderRepository,
  ) {}

  async execute() {
    const users = await this.userRepo.findAll();
    const orders = await this.orderRepo.findAll();

    return users.map((user) => ({
      ...user,
      orders: orders.filter((order) => order.userId === user.id),
    }));
  }
}
