import {
  offlineBookingSchema,
  type TOfflineBookingRequest,
} from "@/features/studioSeats/presentation/schema/offlineBooking.schema";
import { describe, expect, it } from "vitest";

describe("Offline Booking Schema Test", () => {
  it("should return valid schema", () => {
    const sampleOfflineBookingRequest: TOfflineBookingRequest = {
      customerEmail: "john@doe.com",
      customerName: "John Doe",
      seatIds: [1, 2, 3],
      studioId: 1,
    };
    const offlineBookingRequestParse = offlineBookingSchema.safeParse(
      sampleOfflineBookingRequest,
    );
    expect(offlineBookingRequestParse.error).toBeUndefined();
  });

  it("should return inValid schema", () => {
    const sampleOfflineBookingRequest = {
      customerEmail: "john@doe",
      customerName: "J",
      seatIds: ["1"],
      studioId: "1",
    };
    const offlineBookingRequestParse = offlineBookingSchema.safeParse(
      sampleOfflineBookingRequest,
    );
    expect(offlineBookingRequestParse.data).toBeUndefined();
  });
});
