import z, { number } from "zod/v4";

export const ticketSchema = z.object({
  bookingCode: z.uuid(),
  seatIds: z.array(z.number()).min(1),
  studioId: z.number(),
  timestamp: z.coerce.date(),
  userId: z.number().optional(),
});
