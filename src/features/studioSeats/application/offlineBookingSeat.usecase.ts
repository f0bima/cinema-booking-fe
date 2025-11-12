import type { TInputOfflineBooking } from "../../booking/domain/entity/inputOfflineBooking.entity";
import type { IBooking } from "../../booking/domain/repository/booking.repository";

export const offlineBookingSeatUsecase = ({ repo }: { repo: IBooking }) => ({
  execute: (props: TInputOfflineBooking) =>
    repo.createOfflineBooking({ ...props }),
});
