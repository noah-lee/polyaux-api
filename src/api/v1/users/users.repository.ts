import sql from "@/config/postgres";
import { RegisterDTO } from "@/api/v1/auth/dtos/register.dto";
import { UserDTO } from "@/api/v1/users/dtos/user.dto";

class UsersRepository {
  insertUser = async (payload: RegisterDTO) => {
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
