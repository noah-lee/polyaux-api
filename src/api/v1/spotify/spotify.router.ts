import { Router } from "express";
import SpotifyController from "@/api/v1/spotify/spotify.controller";
import validator from "@/middlewares/validator";
import { SearchQuerySchema } from "@/api/v1/spotify/dtos/search.dto";
import { RecommendationsQuerySchema } from "@/api/v1/spotify/dtos/recommendations.dto";
import { TracksFeaturesQuerySchema } from "@/api/v1/spotify/dtos/tracksFeatures.dto";

const spotifyRouter = Router();

spotifyRouter.get(
  "/search",
  validator({ query: SearchQuerySchema }),
  SpotifyController.search
);

spotifyRouter.get(
  "/recommendations",
  validator({ query: RecommendationsQuerySchema }),
  SpotifyController.getRecommendations
);

spotifyRouter.get("/tracks/features/:id", SpotifyController.getTrackFeatures);

spotifyRouter.get(
  "/tracks/features",
  validator({ query: TracksFeaturesQuerySchema }),
  SpotifyController.getTracksFeatures
);

spotifyRouter.get("/tracks/:id", SpotifyController.getTrack);

export default spotifyRouter;
