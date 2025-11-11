import type { AxiosInstance } from "axios";
import type { IBooking } from "../../domain/repository/booking.repository";
import type { TBooking } from "../../domain/entity/booking.entity";
import type { TInputOnlineBooking } from "../../domain/entity/inputOnlineBooking.entity";
import type { TBookingModel } from "../model/booking.model";
import { bookingMapper } from "../mapper/booking.mapper";
import type { TInputOfflineBooking } from "../../domain/entity/inputOfflineBooking.entity";
import type { TBookingValidation } from "../../domain/entity/bookingValidation.entity";

export const bookingDatasource = ({
  api,
}: {
  api: AxiosInstance;
}): IBooking => ({
  createOnlineBooking: async function (
    input: TInputOnlineBooking,
  ): Promise<TBooking> {
    return await api.post("/booking/online", input).then((response) => {
      const bookingModel = response.data as TBookingModel;

      return bookingMapper.toEntity(bookingModel);
    });
  },

  createOfflineBooking: async function (
    input: TInputOfflineBooking,
  ): Promise<TBooking> {
    return await api.post("/booking/offline", input).then((response) => {
      const bookingModel = response.data as TBookingModel;

      return bookingMapper.toEntity(bookingModel);
    });
  },

  validateBookingCode: async function ({
    bookingCode,
  }: {
    bookingCode: string;
  }): Promise<TBookingValidation> {
    return await api
      .post("/booking/validate", { bookingCode })
      .then((response) => {
        const bookingModel = response.data as TBookingValidation;
        const bookingEntity = bookingModel;
        return bookingEntity;
      });
  },

  getBookings: async function (): Promise<TBooking[]> {
    return await api.post("/booking/my-bookings").then((response) => {
      const bookingModel = response.data as TBookingModel[];

      return bookingMapper.toEntities(bookingModel);
    });
  },
});
