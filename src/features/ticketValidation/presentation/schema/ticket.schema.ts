import z, { number } from "zod/v4";

// const sampleTicket = {
//   bookingCode: "3cca9a2a-f64b-4ac2-9437-f5424314ddd0",
//   seatIds: [1, 2, 3],
//   studioId: 1,
//   timestamp: "2025-11-11T14:37:43Z",
//   userId: 1,
// };

export const ticketSchema = z.object({
  bookingCode: z.uuid(),
  seatIds: z.array(z.number()).min(1),
  studioId: z.number(),
  timestamp: z.coerce.date(),
  userId: z.number(),
});
