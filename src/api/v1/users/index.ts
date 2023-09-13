import { UserCreateDTO } from "@/api/v1/users/dtos/userCreate";
import { UserLoginDTO } from "@/api/v1/users/dtos/userLogin";
import UsersController from "@/api/v1/users/users.controller";
import validator from "@/middlewares/validator";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post(
  "/register",
  validator({ body: UserCreateDTO }),
  UsersController.register
);

usersRouter.post(
  "/login",
  validator({ body: UserLoginDTO }),
  UsersController.login
);

export default usersRouter;
