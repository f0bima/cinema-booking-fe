import z from "zod/v4";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type TLoginRequest = z.infer<typeof loginSchema>;
