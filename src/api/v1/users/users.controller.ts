import UsersService from "@/api/v1/users/users.service";
import { NextFunction, Request, Response } from "express";

class UsersController {
  getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.sub;

      if (!id) {
        throw new Error();
      }

      const userProfile = await UsersService.getProfile(id);

      res.status(200).json(userProfile);
    } catch (error) {
      next(error);
    }
  };
}

export default new UsersController();
