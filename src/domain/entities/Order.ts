import { OrderItem } from './OrderItem';

export type Order = {
  id: number;
  userId: number;
  total: number;
  createdAt: Date;
  items: OrderItem[];
};

export type CreateOrderProps = {
  userId: number;
  total: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
};
