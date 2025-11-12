import type { TTicket } from "@/features/booking/domain/entity/ticket.entity";
import type { TBookingValidation } from "../entity/bookingValidation.entity";
import type { TInputOfflineBooking } from "../entity/inputOfflineBooking.entity";
import type { TInputOnlineBooking } from "../entity/inputOnlineBooking.entity";

export interface IBooking {
  createOnlineBooking: (input: TInputOnlineBooking) => Promise<TTicket>;
  createOfflineBooking: (input: TInputOfflineBooking) => Promise<TTicket>;
  validateBookingCode: (props: {
    bookingCode: string;
  }) => Promise<TBookingValidation>;
  getTikets: (props: { token: string }) => Promise<TTicket[]>;
}
