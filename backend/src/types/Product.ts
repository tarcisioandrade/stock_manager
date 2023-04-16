import { ProductSchema } from "@/schemas/ProductSchema";
import { SaleHistory } from "@prisma/client";
import { z } from "zod";

export type ProductInput = z.input<typeof ProductSchema>;

export type ProductItemResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sale_history: Pick<SaleHistory, "sale_date" | "quantity" | "price">[]
};
