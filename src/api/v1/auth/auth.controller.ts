import { NextFunction, Request, Response } from "express";
import AuthService from "@/api/v1/auth/auth.service";
import { RegisterDTO } from "@/api/v1/auth/dtos/register.dto";
import { LoginDTO } from "@/api/v1/auth/dtos/login.dto";

class AuthController {
  register = async (
    req: Request<{}, {}, RegisterDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accessToken = await AuthService.register(req.body);
      res.status(201).json({ accessToken });
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request<{}, {}, LoginDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accessToken = await AuthService.login(req.body);
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
