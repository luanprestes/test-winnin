import { EmailAlreadyInUseError } from '@/application/errors/EmailAlreadyInUseError';
import { Context } from '@/main/context';
import { createUserSchema } from '@/presentation/validators/CreateUserSchema';

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
      { useCases }: Context,
    ) => {
      const result = createUserSchema.safeParse(args.input);

      if (!result.success) {
        throw new Error(
          'Invalid input: ' + JSON.stringify(result.error.format()),
        );
      }

      try {
        return useCases.createUser.execute(args.input);
      } catch (err) {
        if (err instanceof EmailAlreadyInUseError) {
          throw new Error(err.message);
        }

        throw new Error('Erro interno ao criar usuário.');
      }
    },
  },

  User: {
    orders: async (
      parent: { id: number },
      _: unknown,
      { useCases }: Context,
    ) => {
      return useCases.findOrdersByUserId.execute(parent.id);
    },
  },
};
