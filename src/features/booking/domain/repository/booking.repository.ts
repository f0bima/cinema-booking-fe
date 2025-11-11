import type { TBooking } from "../entity/booking.entity";
import type { TInputOfflineBooking } from "../entity/inputOfflineBooking.entity";
import type { TInputOnlineBooking } from "../entity/inputOnlineBooking.entity";

export interface IBooking {
  createOnlineBooking: (input: TInputOnlineBooking) => Promise<TBooking>;
  createOfflineBooking: (input: TInputOfflineBooking) => Promise<TBooking>;
}
