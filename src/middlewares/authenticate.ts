import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UsersRepository from "@/api/v1/users/users.repository";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    throw new Error();
  }

  if (!process.env.JWT_SECRET) {
    throw new Error();
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (!decoded.sub || typeof decoded.sub !== "string") {
      throw new Error();
    }

    req.sub = decoded.sub;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
