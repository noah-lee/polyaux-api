import z from "zod";

export const RegisterDTO = z.strictObject({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type RegisterDTO = z.infer<typeof RegisterDTO>;
