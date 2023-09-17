import z from "zod";

export const RegisterRequestSchema = z.strictObject({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type RegisterRequestDTO = z.infer<typeof RegisterRequestSchema>;
