import { Context } from "@/main/context";
import { createProductSchema } from "@/presentation/validators/CreateProductSchema";

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
      const result = createProductSchema.safeParse(args.input);

      if (!result.success) {
        throw new Error(
          "Invalid input: " + JSON.stringify(result.error.format())
        );
      }

      return useCases.createProduct.execute(args.input);
    },
  },
};
