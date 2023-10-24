import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
