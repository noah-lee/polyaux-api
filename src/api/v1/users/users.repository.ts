import { CreateUserDto } from "@/api/v1/users/dtos/createUser.dto";
import pool from "@/config/pg";

export const insertUser = async (data: CreateUserDto) => {
  const { username, email, password } = data;
  try {
    const result = await pool.query(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING username, email, ",
      [username, email, password]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
