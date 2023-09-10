import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "@/api/v1/users/dtos/user.dto";

export const generateJwtToken = (payload: User) => {
  return jwt.sign(payload, "tst");
};
