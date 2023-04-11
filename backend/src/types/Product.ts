import { ProductSchema } from "@/validators/ProductSchema";
import { z } from "zod";

export type ProductInput = z.input<typeof ProductSchema>;
