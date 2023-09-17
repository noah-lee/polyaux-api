import { Router } from "express";
import AuthController from "@/api/v1/auth/auth.controller";
import validator from "@/middlewares/validator";
import { RegisterDTO } from "@/api/v1/auth/dtos/register.dto";
import { LoginDTO } from "@/api/v1/auth/dtos/login.dto";

const authRouter = Router();

authRouter.post(
  "/register",
  validator({ body: RegisterDTO }),
  AuthController.register
);

authRouter.post("/login", validator({ body: LoginDTO }), AuthController.login);

export default authRouter;
