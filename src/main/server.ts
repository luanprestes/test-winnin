import { ApolloServer } from "apollo-server";
import { typeDefs } from "@/presentation/graphql/schemas";
import { resolvers } from "@/presentation/graphql/resolvers";
import { createContext } from "@/main/context";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => createContext(),
  });

  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 Server ready at ${url}`);
}

startServer();
