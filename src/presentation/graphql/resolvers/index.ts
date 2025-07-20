import { mergeResolvers } from "@graphql-tools/merge";
import { UserResolver } from "./UserResolver";
import { ProductResolver } from "./ProductResolver";
import { OrderResolver } from "./OrderResolver";
import { OrderItemResolver } from "./OrderItemResolver";

export const resolvers = mergeResolvers([
  UserResolver,
  ProductResolver,
  OrderResolver,
  OrderItemResolver,
]);
