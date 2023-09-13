import "dotenv/config";
import bcrypt from "bcrypt";
import UsersRepository from "@/api/v1/users/users.repository";
import { UserCreateDTO } from "@/api/v1/users/dtos/userCreate";
import { generateAccessToken } from "@/api/v1/users/users.helper";
import { UserLoginDTO } from "@/api/v1/users/dtos/userLogin";

class UsersService {
  register = async (payload: UserCreateDTO) => {
    const { username, email, password } = payload;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await UsersRepository.insertUser({
        username,
        email,
        password: hashedPassword,
      });

      const token = generateAccessToken({ sub: newUser.id });

      return token;
    } catch (error) {
      throw error;
    }
  };

  login = async (payload: UserLoginDTO) => {
    const { email, password } = payload;

    try {
      const user = await UsersRepository.getUserByEmail(email);

      if (!user) {
        throw new Error("Email not found");
      }

      console.log("user", user);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Incorrect password");
      }

      const token = generateAccessToken({ sub: user.id });

      return token;
    } catch (error) {
      throw error;
    }
  };
}

export default new UsersService();
