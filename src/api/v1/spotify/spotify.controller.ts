import { NextFunction, Request, Response } from "express";
import SpotifyService from "@/api/v1/spotify/spotify.service";
import { TrackRecommendationsQueryDTO } from "@/api/v1/spotify/dtos/recommendations.dto";

class SpotifyController {
  getTrack = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      if (!SpotifyService.accessToken) {
        await SpotifyService.authenticate();
      }

      const track = await SpotifyService.withRetries(
        SpotifyService.getTrack,
        id
      );

      res.status(200).json(track);
    } catch (error) {
      next(error);
    }
  };

  getRecommendations = async (
    req: Request<{}, {}, {}, TrackRecommendationsQueryDTO>,
    res: Response,
    next: NextFunction
  ) => {
    const query = req.query;

    try {
      if (!SpotifyService.accessToken) {
        await SpotifyService.authenticate();
      }

      const track = await SpotifyService.withRetries(
        SpotifyService.getRecommendations,
        query
      );

      res.status(200).json(track);
    } catch (error) {
      next(error);
    }
  };
}

export default new SpotifyController();
