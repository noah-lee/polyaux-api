import z from "zod";

export const TrackRecommendationsQueryDTO = z
  .strictObject({
    seed_artists: z.string().optional(),
    seed_genres: z.string().optional(),
    seed_tracks: z.string().optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  })
  .refine(
    (query) => {
      const hasAtLeastOneSeedType = !![
        "seed_artists",
        "seed_genres",
        "seed_tracks",
      ].filter(
        (seedType) => query[seedType as keyof typeof query] !== undefined
      ).length;

      if (!hasAtLeastOneSeedType) {
        return false;
      }

      return true;
    },
    {
      message:
        "Query must include at least one of: seed_artists, seed_genres, seed_tracks",
    }
  );

export type TrackRecommendationsQueryDTO = z.infer<
  typeof TrackRecommendationsQueryDTO
>;
