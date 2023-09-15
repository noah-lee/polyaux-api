import { UserCreateDTO } from "@/api/v1/users/dtos/userCreate";
import UserDTO from "@/api/v1/users/dtos/user.dto";
import sql from "@/config/postgres";

class UsersRepository {
  insertUser = async (payload: UserCreateDTO) => {
    try {
      const [user]: [UserDTO] = await sql`
      INSERT INTO users ${sql(payload, "username", "email", "password")} 
      RETURNING *
      `;

      return user;
    } catch (error) {
      throw error;
    }
  };

  getUserByEmail = async (email: string) => {
    try {
      const [user]: [UserDTO?] = await sql`
      SELECT * FROM users
      WHERE email = ${email}
      `;

      return user;
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id: string) => {
    try {
      const [user]: [UserDTO?] = await sql`
      SELECT * FROM users
      WHERE id = ${id}
      `;

      return user;
    } catch (error) {
      throw error;
    }
  };
}

export default new UsersRepository();
