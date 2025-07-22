import { Context } from '@/main/context';
import { createOrderSchema } from '@/presentation/validators/CreateOrderSchema';

export const OrderResolver = {
  Mutation: {
    createOrder: async (
      _: unknown,
      args: {
        input: {
          userId: number;
          items: {
            productId: number;
            quantity: number;
          }[];
        };
      },
      { useCases }: Context,
    ) => {
      const result = createOrderSchema.safeParse(args.input);

      if (!result.success) {
        throw new Error(
          'Invalid input: ' + JSON.stringify(result.error.format()),
        );
      }

      return useCases.createOrder.execute(args.input);
    },
  },

  Order: {
    user: async (
      parent: { userId: number },
      _args: unknown,
      { useCases }: Context,
    ) => {
      return useCases.findUserById.execute(parent.userId);
    },
    items: async (
      parent: { id: number },
      _args: unknown,
      { useCases }: Context,
    ) => {
      return useCases.findOrderItemsByOrderId.execute(parent.id);
    },
  },
};
