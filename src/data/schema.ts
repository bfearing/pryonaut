import { z } from "zod";

export const peopleSchema = z.object({
  name: z.string(),
  craft: z.string(),
});

export const atrosSchema = z.object({
  number: z.number(),
  people: z.array(peopleSchema),
  message: z.string(),
});

export const issNowSchema = z.object({
  message: z.string(),
  iss_position: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
  timestamp: z.number(),
});

export type People = z.infer<typeof peopleSchema>;
export type Astros = z.infer<typeof atrosSchema>;
export type ISSNow = z.infer<typeof issNowSchema>;
