import type { IBooking } from "../../../booking/domain/repository/booking.repository";

export const getTicketsUsecase = ({ repo }: { repo: IBooking }) => ({
  execute: ({ token }: { token: string }) => repo.getTikets({ token }),
});
