import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';

interface Input {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: Input): Promise<User> {
    return this.userRepo.create(input);
  }
}
