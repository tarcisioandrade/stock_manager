import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string().transform((price) => {
    const priceFormatted = price.trim().replace("R$", "").replace(",", ".");

    return Number(priceFormatted);
  }),
  categoryId: z.string(),
  quantity: z.string(),
  branchId: z.string(),
});
