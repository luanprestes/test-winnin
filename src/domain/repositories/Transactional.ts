export interface Transactional {
  runInTransaction<T>(callback: () => Promise<T>): Promise<T>;
}
