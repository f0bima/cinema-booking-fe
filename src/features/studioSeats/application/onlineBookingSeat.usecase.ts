import type { TInputOnlineBooking } from "../../booking/domain/entity/inputOnlineBooking.entity";
import type { IBooking } from "../../booking/domain/repository/booking.repository";

export const onlineBookingSeatUsecase = ({ repo }: { repo: IBooking }) => ({
  execute: (props: TInputOnlineBooking) =>
    repo.createOnlineBooking({ ...props }),
});
