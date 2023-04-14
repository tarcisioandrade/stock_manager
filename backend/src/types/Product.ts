import { ProductSchema } from "@/schemas/ProductSchema";
import { z } from "zod";

export type ProductInput = z.input<typeof ProductSchema>;
