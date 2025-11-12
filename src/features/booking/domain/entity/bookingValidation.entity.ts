import type { EBookingType } from "./ticket.entity";

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
