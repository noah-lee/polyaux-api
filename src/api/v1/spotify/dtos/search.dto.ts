import z from "zod";

export const SearchQuerySchema = z.strictObject({
  q: z.string(),
  type: z
    .enum([
      "album",
      "artist",
      "playlist",
      "track",
      "show",
      "episode",
      "audiobook",
    ])
    .default("track"),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

export type SearchQueryDTO = z.infer<typeof SearchQuerySchema>;
