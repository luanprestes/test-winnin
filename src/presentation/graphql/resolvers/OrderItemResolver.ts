import { Context } from '@/main/context';

export const OrderItemResolver = {
  OrderItem: {
    product: async (parent: any, _: unknown, { useCases }: Context) => {
      return useCases.findProductById.execute(parent.productId);
    },
  },
};
