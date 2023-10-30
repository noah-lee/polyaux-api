import { Router } from "express";
import authRouter from "@/api/v1/auth/auth.router";
import usersRouter from "./users/users.router";
import spotifyRouter from "@/api/v1/spotify/spotify.router";

const v1Router = Router();

// v1Router.use("/auth", authRouter);
// v1Router.use("/users", usersRouter);
v1Router.use("/spotify", spotifyRouter);

export default v1Router;
