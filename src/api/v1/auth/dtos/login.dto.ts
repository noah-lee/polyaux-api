import z from "zod";

export const LoginRequestSchema = z.strictObject({
  email: z.string(),
  password: z.string(),
});

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
