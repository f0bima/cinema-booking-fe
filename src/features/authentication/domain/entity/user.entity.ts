import z from "zod/v4";

// export type TUser = {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// };

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string().min(3),
  role: z.enum(["customer", "admin"]),
});

export type TUser = z.infer<typeof userSchema>;
