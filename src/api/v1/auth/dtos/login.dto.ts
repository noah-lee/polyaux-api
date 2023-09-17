import z from "zod";

export const LoginDTO = z.strictObject({
  email: z.string(),
  password: z.string(),
});

export type LoginDTO = z.infer<typeof LoginDTO>;
