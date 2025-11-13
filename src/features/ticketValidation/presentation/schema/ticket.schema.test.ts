import { ticketSchema } from "@/features/ticketValidation/presentation/schema/ticket.schema";
import { describe, expect, it } from "vitest";

describe("Ticket Schema Test", () => {
  it("should return valid ticket", () => {
    const sampleTicket = {
      bookingCode: "3cca9a2a-f64b-4ac2-9437-f5424314ddd0",
      seatIds: [1, 2, 3],
      studioId: 1,
      timestamp: "2025-11-11T14:37:43Z",
      userId: 1,
    };
    const ticketParse = ticketSchema.safeParse(sampleTicket);
    expect(ticketParse.error).toBeUndefined();

    const validTicket = ticketParse.data;
    expect(validTicket.bookingCode).toBe(
      "3cca9a2a-f64b-4ac2-9437-f5424314ddd0",
    );
    expect(validTicket.seatIds.length).toBe(3);
    expect(validTicket.studioId).toBe(1);
    expect(validTicket.userId).toBe(1);
  });

  it("should return inValid ticket", () => {
    const ticketToBeChecked = {
      bookingCode: "code",
      seatIds: ["1", "2", "3"],
      studioId: "1",
      timestamp: "2025-11-11",
      userId: "1",
    };
    const ticketParse = ticketSchema.safeParse(ticketToBeChecked);
    expect(ticketParse.data).toBeUndefined();
  });
});
