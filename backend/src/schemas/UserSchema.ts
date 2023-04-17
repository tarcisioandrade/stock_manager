import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
  telephone: z.string().optional(),
  branch_id: z.string().cuid(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  type: z.enum(["ADMIN", "USER"]),
});

export const EditUserSchema = z.object({
  name: z.string().optional(),
  password: z.string().min(8).optional(),
  telephone: z.string().optional(),
});
