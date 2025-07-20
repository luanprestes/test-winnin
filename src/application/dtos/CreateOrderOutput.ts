export interface CreateOrderOutput {
  id: number;
  userId: number;
  total: number;
  createdAt: Date;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}
