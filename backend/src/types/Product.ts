import { ProductSchema } from "@/validators/ProductSchema";
import { z } from "zod";

const ProductWithIdSchema = ProductSchema.extend({
  id: z.string(),
});

export type ProductInput = z.input<typeof ProductSchema>;
export type ProductType = z.output<typeof ProductWithIdSchema>;
