import { NextFunction, Request, Response } from "express";
import { UserCreateDTO } from "@/api/v1/users/dtos/userCreate";
import { UserLoginDTO } from "@/api/v1/users/dtos/userLogin";
import AuthService from "@/api/v1/auth/auth.service";

class AuthController {
  register = async (
    req: Request<{}, {}, UserCreateDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = await AuthService.register(req.body);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request<{}, {}, UserLoginDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = await AuthService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
