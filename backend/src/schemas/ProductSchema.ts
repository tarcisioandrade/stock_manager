import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string().transform((price) => {
    const priceFormatted = price.trim().replace("R$", "").replace(",", ".");

    return priceFormatted
  }),
  category_id: z.string().cuid(),
  quantity: z.string(),
  branch_id: z.string().cuid(),
});

export type BodyToCreateNewProduct = z.infer<typeof ProductSchema>
