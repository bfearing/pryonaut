import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  image: z.object({
    large: z.object({ url: z.string() }),
    medium: z.object({ url: z.string() }),
    small: z.object({ url: z.string() }),
    thumbnail: z.object({ url: z.string() }),
  }),
  imageHolo: z.object({
    large: z.object({ url: z.string() }),
    medium: z.object({ url: z.string() }),
    small: z.object({ url: z.string() }),
    thumbnail: z.object({ url: z.string() }),
  }),
  title: z.string(),
  // status: z.string(),
  // label: z.string(),
  // priority: z.string(),
  set: z.string(),
  edition: z.string(),
  registeredCount: z.number(),
  registered: z.string(),
  isAnnounced: z.boolean(),
  product: z.string(),
  populationCount: z.number(),
});

export const populationSchema = z.object({
  id: z.number(),
  image: z.object({
    large: z.object({ url: z.string() }),
    medium: z.object({ url: z.string() }),
    small: z.object({ url: z.string() }),
    thumbnail: z.object({ url: z.string() }),
  }),
  imageHolo: z.object({
    large: z.object({ url: z.string() }),
    medium: z.object({ url: z.string() }),
    small: z.object({ url: z.string() }),
    thumbnail: z.object({ url: z.string() }),
  }),
  title: z.string(),
  set: z.string(),
  edition: z.string(),
  registered: z.string(),
  populationCount: z.number(),
  number: z.number(),
  registeredDate: z.string(),
  originalOwner: z.string().nullable(),
  currentOwner: z.string().nullable(),
  currentLocation: z.string(),
});

export const timelineSchema = z.object({
  id: z.number(),
  cardId: z.number(),
  title: z.string(),
  cardNumber: z.number(),
  cardImageData: z.object({
    large: z.object({ url: z.string() }),
    medium: z.object({ url: z.string() }),
    small: z.object({ url: z.string() }),
    thumbnail: z.object({ url: z.string() }),
  }),
  cardImageHoloData: z.object({
    large: z.object({ url: z.string() }),
    medium: z.object({ url: z.string() }),
    small: z.object({ url: z.string() }),
    thumbnail: z.object({ url: z.string() }),
  }),
  edition: z.string(),
  set: z.string(),
  cardProduct: z.string(),
  cardTotalCount: z.number(),
  name: z.string(),
  number: z.number(),
  owner: z.object({
    id: z.number(),
    location: z.string(),
    name: z.string(),
    originalOwner: z.boolean(),
  }),
  product: z.string(),
  registeredDate: z.string(),
});

export const timelineCardSchema = z.object({
  first: z.any(),
  second: z.any(),
});

export type Task = z.infer<typeof taskSchema>;
export type Population = z.infer<typeof populationSchema>;
export type TimelineTask = z.infer<typeof timelineSchema>;
export type TimelineCardTask = z.infer<typeof timelineCardSchema>[];
