import z from "zod/v4";

export const registerSchema = z
  .object({
    email: z.email(),
    name: z.string().min(3),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    error: "Password doesn't match",
    path: ["passwordConfirmation"],
  });

export type TRegisterReguest = z.infer<typeof registerSchema>;
