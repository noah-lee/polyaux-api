import z from "zod";

export const UserLoginDTO = z.strictObject({
  email: z.string(),
  password: z.string(),
});

export type UserLoginDTO = z.infer<typeof UserLoginDTO>;
