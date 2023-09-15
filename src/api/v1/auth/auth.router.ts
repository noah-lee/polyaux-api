import AuthController from "@/api/v1/auth/auth.controller";
import { UserCreateDTO } from "@/api/v1/users/dtos/userCreate";
import { UserLoginDTO } from "@/api/v1/users/dtos/userLogin";
import validator from "@/middlewares/validator";
import { Router } from "express";

const authRouter = Router();

authRouter.post(
  "/register",
  validator({ body: UserCreateDTO }),
  AuthController.register
);

authRouter.post(
  "/login",
  validator({ body: UserLoginDTO }),
  AuthController.login
);

export default authRouter;
