import express from "express";
import { registerController } from "@/api/v1/users/users.controller";

const usersRouter = express.Router();

usersRouter.post("/register", registerController);

export default usersRouter;
