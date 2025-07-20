import { Context } from "@/main/context";

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
      { useCases }: Context
    ) => {
      return useCases.createOrder.execute(args.input);
    },
  },
};
