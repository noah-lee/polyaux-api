import z from "zod";

export const UserCreateDTO = z.strictObject({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type UserCreateDTO = z.infer<typeof UserCreateDTO>;
