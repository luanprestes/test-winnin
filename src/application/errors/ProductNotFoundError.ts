export class ProductNotFoundError extends Error {
  constructor(productId: number) {
    super(`Product with ID ${productId} not found`);
    this.name = "ProductNotFoundError";
  }
}
