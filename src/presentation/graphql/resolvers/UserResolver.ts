import { Context } from "@/main/context";

export const UserResolver = {
  Query: {
    users: async (_: unknown, __: unknown, { useCases }: Context) => {
      return useCases.listUsersWithOrders.execute();
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      args: { input: { name: string; email: string } },
      { useCases }: Context
    ) => {
      return useCases.createUser.execute(args.input);
    },
  },

  User: {
    orders: async (
      parent: { id: number },
      _: unknown,
      { useCases }: Context
    ) => {
      return useCases.findOrdersByUserId.execute(parent.id);
    },
  },
};
