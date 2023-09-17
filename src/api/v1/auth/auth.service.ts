import "dotenv/config";
import bcrypt from "bcrypt";
import UsersRepository from "@/api/v1/users/users.repository";
import { RegisterRequestDTO } from "@/api/v1/auth/dtos/register.dto";
import { LoginRequestDTO } from "@/api/v1/auth/dtos/login.dto";
import { generateAccessToken } from "@/utils/jwt";

class AuthService {
  register = async (payload: RegisterRequestDTO) => {
    const { username, email, password } = payload;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await UsersRepository.insertUser({
        username,
        email,
        password: hashedPassword,
      });

      const accessToken = generateAccessToken({ sub: newUser.id });

      return accessToken;
    } catch (error) {
      throw error;
    }
  };

  login = async (payload: LoginRequestDTO) => {
    const { email, password } = payload;

    try {
      const user = await UsersRepository.getUserByEmail(email);

      if (!user) {
        throw new Error();
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error();
      }

      const accessToken = generateAccessToken({ sub: user.id });

      return accessToken;
    } catch (error) {
      throw error;
    }
  };
}

export default new AuthService();
