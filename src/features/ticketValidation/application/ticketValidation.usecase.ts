import type { IBooking } from "../../booking/domain/repository/booking.repository";

export const ticketValidationUsecase = (props: { repo: IBooking }) => ({
  execute: ({ bookingCode }: { bookingCode: string }) =>
    props.repo.validateBookingCode({ bookingCode }),
});
