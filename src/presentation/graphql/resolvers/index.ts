import { mergeResolvers } from "@graphql-tools/merge";
import { UserResolver } from "./UserResolver";
import { ProductResolver } from "./ProductResolver";
import { OrderResolver } from "./OrderResolver";

export const resolvers = mergeResolvers([
  UserResolver,
  ProductResolver,
  OrderResolver,
]);
