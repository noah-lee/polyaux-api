import { Router } from "express";
import authRouter from "@/api/v1/auth/auth.router";
import usersRouter from "./users/users.router";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/users", usersRouter);

export default v1Router;
