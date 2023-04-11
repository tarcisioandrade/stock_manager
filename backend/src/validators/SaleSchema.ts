import { z } from "zod";

export const SaleProductSchema = z.object({
  stock_id: z.string().cuid(),
  quantity: z.string().transform((val) => Number(val)),
  price: z.string().transform((price) => {
    const priceFormatted = price.trim().replace("R$", "").replace(",", ".");

    return Number(priceFormatted);
  }),
});
