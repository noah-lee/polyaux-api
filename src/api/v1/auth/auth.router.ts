import { Router } from "express";
import AuthController from "@/api/v1/auth/auth.controller";
import validator from "@/middlewares/validator";
import { RegisterRequestSchema } from "@/api/v1/auth/dtos/register.dto";
import { LoginRequestSchema } from "@/api/v1/auth/dtos/login.dto";

const authRouter = Router();

authRouter.post(
  "/register",
  validator({ body: RegisterRequestSchema }),
  AuthController.register
);

authRouter.post("/login", validator({ body: LoginRequestSchema }), AuthController.login);

export default authRouter;
