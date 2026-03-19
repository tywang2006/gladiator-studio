import { z } from 'zod';

const GameSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  link: z.string().url().or(z.string()),
  timeline: z.string(),
});

export const GameDataResponseSchema = z.object({
  slotGames: z.array(GameSchema),
  miniGames: z.array(GameSchema),
});

export type GameDataResponse = z.infer<typeof GameDataResponseSchema>;
