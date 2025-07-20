import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}
