import { startServer } from "@/presentation/graphql/server";
import { createContext } from "./context";

startServer(createContext());
