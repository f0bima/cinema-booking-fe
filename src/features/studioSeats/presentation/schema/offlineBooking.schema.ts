import z from "zod/v4";

export const offlineBookingSchema = z.object({
  customerName: z.string(),
  customerEmail: z.email(),
  studioId: z.number(),
  seatIds: z.array(z.number()),
});

export type TOfflineBookingRequest = z.infer<typeof offlineBookingSchema>;
