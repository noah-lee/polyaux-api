import z from "zod";

export const TracksFeaturesQuerySchema = z.strictObject({
  ids: z.string(),
});

export type TracksFeaturesQueryDTO = z.infer<typeof TracksFeaturesQuerySchema>;
