import type { TBooking } from "../entity/booking.entity";
import type { TBookingValidation } from "../entity/bookingValidation.entity";
import type { TInputOfflineBooking } from "../entity/inputOfflineBooking.entity";
import type { TInputOnlineBooking } from "../entity/inputOnlineBooking.entity";

export interface IBooking {
  createOnlineBooking: (input: TInputOnlineBooking) => Promise<TBooking>;
  createOfflineBooking: (input: TInputOfflineBooking) => Promise<TBooking>;
  validateBookingCode: (props: {
    bookingCode: string;
  }) => Promise<TBookingValidation>;
  getBookings: () => Promise<TBooking[]>;
}
