import { prisma } from './client';
import { Transactional } from '@/domain/repositories/Transactional';

export class PrismaTransactionAdapter implements Transactional {
  async runInTransaction<T>(callback: () => Promise<T>): Promise<T> {
    return prisma.$transaction(callback);
  }
}
