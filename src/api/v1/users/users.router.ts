import UsersController from "@/api/v1/users/users.controller";
import authenticate from "@/middlewares/authenticate";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/me", authenticate, UsersController.getMyProfile);

export default usersRouter;
