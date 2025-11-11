import type { EBookingType } from "./booking.entity";

export type TBookingValidation = {
  booking: {
    bookingCode: string;
    bookingType: EBookingType;
    customerName: string;
    seatIds: number[];
    studioId: number;
  };
  valid: boolean;
};
