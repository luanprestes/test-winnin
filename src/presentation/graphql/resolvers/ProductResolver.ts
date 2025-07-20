import { Context } from "@/main/context";

export const ProductResolver = {
  Query: {
    products: async (_: unknown, __: unknown, { useCases }: Context) => {
      return useCases.listProducts.execute();
    },
  },

  Mutation: {
    createProduct: async (
      _: unknown,
      args: { input: { name: string; price: number; stock: number } },
      { useCases }: Context
    ) => {
      return useCases.createProduct.execute(args.input);
    },
  },
};
