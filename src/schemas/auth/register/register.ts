import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email().max(256),
  password: z
    .string()
    .min(8)
    .max(256)
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/),
  first_name: z.string().min(2).max(256),
  last_name: z.string().min(2).max(256),
});
