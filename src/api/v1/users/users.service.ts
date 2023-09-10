import { CreateUserDto } from "@/api/v1/users/dtos/createUser.dto";
import { insertUser } from "@/api/v1/users/users.repository";

export const registerService = async (data: CreateUserDto) => {
  try {
    // TODO hash password
    const newUser = await insertUser(data);
    // TODO generate jwt
    return newUser;
  } catch (error) {
    throw error;
  }
};
