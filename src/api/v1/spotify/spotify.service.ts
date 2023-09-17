import "dotenv/config";
import axios from "axios";
import { TrackRecommendationsQueryDTO } from "@/api/v1/spotify/dtos/recommendations.dto";

class SpotifyService {
  accessToken?: string;

  authenticate = async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    try {
      if (!clientId || !clientSecret) {
        throw new Error();
      }

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
              Buffer.from(clientId + ":" + clientSecret).toString("base64"),
          },
        }
      );

      this.accessToken = response.data.access_token;
    } catch (error) {
      throw error;
    }
  };

  withRetries = async <T, R>(callback: (...args: T[]) => R, ...args: T[]) => {
    let retries = 3;

    while (retries > 0) {
      try {
        return await callback(...args);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          retries
        ) {
          retries--;
        } else {
          throw error;
        }
      }
    }
  };

  getTrack = async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getRecommendations = async (query: TrackRecommendationsQueryDTO) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          params: query,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default new SpotifyService();
