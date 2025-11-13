import type { AxiosInstance } from "axios";
import type { IBooking } from "../../domain/repository/booking.repository";

import type { TBookingValidation } from "../../domain/entity/bookingValidation.entity";
import type { TInputOfflineBooking } from "../../domain/entity/inputOfflineBooking.entity";
import type { TInputOnlineBooking } from "../../domain/entity/inputOnlineBooking.entity";
import type { TTicket } from "../../domain/entity/ticket.entity";

import { ticketMapper } from "../mapper/ticket.mapper";
import type { TBookingModel, TTicketModel } from "../model/booking.model";

export const bookingDatasource = ({
  api,
}: {
  api: AxiosInstance;
}): IBooking => ({
  createOnlineBooking: async function (
    input: TInputOnlineBooking,
  ): Promise<TTicket> {
    const { token, ...restInputBooking } = input;
    return await api
      .post("/booking/online", restInputBooking, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        const bookingModel = response.data as TBookingModel;

        return ticketMapper.toEntity(bookingModel.booking);
      });
  },

  createOfflineBooking: async function (
    input: TInputOfflineBooking,
  ): Promise<TTicket> {
    return await api.post("/booking/offline", input).then((response) => {
      const bookingModel = response.data as TBookingModel;

      return ticketMapper.toEntity(bookingModel.booking);
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

  getTikets: async function (props: { token: string }): Promise<TTicket[]> {
    return await api
      .get("/booking/my-bookings", {
        headers: { Authorization: props.token },
      })
      .then((response) => {
        const ticketModels = response.data as TTicketModel[];

        console.log({ ticketModels });

        return ticketMapper.toEntities(ticketModels);
      });
  },
});
