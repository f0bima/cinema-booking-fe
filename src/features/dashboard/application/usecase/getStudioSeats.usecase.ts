import type { TSeat } from "../../../cinema/domain/entity/seat.entity";
import type { ICinema } from "../../../cinema/domain/repository/cinema.repository";

export const getStudioSeatsUsecase = (props: { repo: ICinema }) => ({
  execute: async ({ studioId }: { studioId: number }): Promise<TSeat[]> => {
    return props.repo.getStudioSeats({ studioId });
  },
});
