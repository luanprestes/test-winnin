import { ApolloServer } from 'apollo-server';
import { typeDefs } from '@/presentation/graphql/schemas';
import { resolvers } from '@/presentation/graphql/resolvers';
import { Context } from '@/main/context';

export async function startServer(context: Context) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => context,
  });

  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 Server ready at ${url}`);
}
