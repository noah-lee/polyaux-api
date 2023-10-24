import "dotenv/config";
import axios, { AxiosInstance } from "axios";
import { SearchQueryDTO } from "@/api/v1/spotify/dtos/search.dto";
import { RecommendationsQueryDTO } from "@/api/v1/spotify/dtos/recommendations.dto";
import { TracksFeaturesQueryDTO } from "@/api/v1/spotify/dtos/tracksFeatures.dto";

class SpotifyService {
  spotifyAxios: AxiosInstance;

  constructor() {
    this.spotifyAxios = axios.create({
      baseURL: "https://api.spotify.com/v1",
    });

    // Request interceptor to authenticate if Authorization header is missing
    this.spotifyAxios.interceptors.request.use(async (config) => {
      if (!this.spotifyAxios.defaults.headers.common["Authorization"]) {
        await this.authenticate();
      }

      return config;
    });

    // Response error interceptor to authenticate if error is 401 (invalid/expired access token)
    this.spotifyAxios.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          error.config
        ) {
          await this.authenticate();

          return this.spotifyAxios(error.config);
        }

        return Promise.reject(error);
      }
    );
  }

  authenticate = async () => {
    console.log('SPOTIFY_CLIENT_ID', process.env.SPOTIFY_CLIENT_ID)
    console.log('SPOTIFY_CLIENT_SECRET', process.env.SPOTIFY_CLIENT_SECRET)
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "client_credentials",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.SPOTIFY_CLIENT_ID +
                  ":" +
                  process.env.SPOTIFY_CLIENT_SECRET
              ).toString("base64"),
          },
        }
      );

      this.spotifyAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
    } catch (error) {
      throw error;
    }
  };

  search = async (query: SearchQueryDTO) => {
    try {
      const response = await this.spotifyAxios.get("/search", {
        params: query,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getRecommendations = async (query: RecommendationsQueryDTO) => {
    try {
      const response = await this.spotifyAxios.get("/recommendations", {
        params: query,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getTrackFeatures = async (id: string) => {
    try {
      const response = await this.spotifyAxios.get(`/audio-features/${id}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getTracksFeatures = async (query: TracksFeaturesQueryDTO) => {
    try {
      const response = await this.spotifyAxios.get("/audio-features", {
        params: query,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getTrack = async (id: string) => {
    try {
      const response = await this.spotifyAxios.get(`/tracks/${id}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default new SpotifyService();
