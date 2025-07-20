export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderInput {
  userId: number;
  items: OrderItemInput[];
}
