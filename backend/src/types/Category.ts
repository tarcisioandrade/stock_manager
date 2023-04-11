import { z } from "zod";
import {ProductSchema} from "@/validators/ProductSchema"

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
};

