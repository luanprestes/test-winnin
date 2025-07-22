import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  price: z.number().positive("Preço deve ser positivo"),
  stock: z.number().int().nonnegative("Estoque não pode ser negativo"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
