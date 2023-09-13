import { NextFunction, Request, Response } from "express";
import UserService from "@/api/v1/users/users.service";
import { UserCreateDTO } from "@/api/v1/users/dtos/userCreate";
import { UserLoginDTO } from "@/api/v1/users/dtos/userLogin";

class UsersController {
  register = async (
    req: Request<{}, {}, UserCreateDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = await UserService.register(req.body);
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
      const token = await UserService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default new UsersController();
