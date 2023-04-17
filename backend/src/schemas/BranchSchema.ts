import { z } from "zod";

export const BranchSchema = z.object({
  name: z.string(),
  location: z.string(),
});

export const EditBranchSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
});
