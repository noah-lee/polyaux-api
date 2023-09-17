import { Router } from "express";
import SpotifyController from "@/api/v1/spotify/spotify.controller";
import validator from "@/middlewares/validator";
import { TrackRecommendationsQueryDTO } from "@/api/v1/spotify/dtos/recommendations.dto";

const spotifyRouter = Router();

spotifyRouter.get("/tracks/:id", SpotifyController.getTrack);
spotifyRouter.get(
  "/recommendations",
  validator({ query: TrackRecommendationsQueryDTO }),
  SpotifyController.getRecommendations
);

export default spotifyRouter;
