import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Schema GraphQL inicial
const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    createdAt: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello from Sistema de Pedidos Fictícia!",
    users: async () => {
      return await prisma.user.findMany();
    },
  },
};

// Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
