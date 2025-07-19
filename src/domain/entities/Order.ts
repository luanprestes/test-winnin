import { OrderItem } from "./OrderItem";

export type Order = {
  id: number;
  userId: number;
  total: number;
  createdAt: Date;
  items: OrderItem[];
};
