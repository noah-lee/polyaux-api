import { NextFunction, Request, Response } from "express";
import SpotifyService from "@/api/v1/spotify/spotify.service";
import { SearchQueryDTO } from "@/api/v1/spotify/dtos/search.dto";
import { RecommendationsQueryDTO } from "@/api/v1/spotify/dtos/recommendations.dto";
import { TracksFeaturesQueryDTO } from "@/api/v1/spotify/dtos/tracksFeatures.dto";

class SpotifyController {
  search = async (
    req: Request<{}, {}, {}, SearchQueryDTO>,
    res: Response,
    next: NextFunction
  ) => {
    const query = req.query;

    try {
      const result = await SpotifyService.search(query);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getRecommendations = async (
    req: Request<{}, {}, {}, RecommendationsQueryDTO>,
    res: Response,
    next: NextFunction
  ) => {
    const query = req.query;

    try {
      const track = await SpotifyService.getRecommendations(query);

      res.status(200).json(track);
    } catch (error) {
      next(error);
    }
  };

  getTrackFeatures = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const track = await SpotifyService.getTrackFeatures(id);
      res.status(200).json(track);
    } catch (error) {
      next(error);
    }
  };

  getTracksFeatures = async (
    req: Request<{}, {}, {}, TracksFeaturesQueryDTO>,
    res: Response,
    next: NextFunction
  ) => {
    const query = req.query;

    try {
      const track = await SpotifyService.getTracksFeatures(query);
      res.status(200).json(track);
    } catch (error) {
      next(error);
    }
  };

  getTrack = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const track = await SpotifyService.getTrack(id);
      res.status(200).json(track);
    } catch (error) {
      next(error);
    }
  };
}

export default new SpotifyController();
