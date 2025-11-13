import type { TSeat } from "../../../cinema/domain/entity/seat.entity";
import type { ICinema } from "../../../cinema/domain/repository/cinema.repository";

export const getStudioSeatsUsecase = (props: { repo: ICinema }) => ({
  execute: async ({ studioId }: { studioId: number }): Promise<TSeat[]> => {
    return props.repo.getStudioSeats({ studioId }).then((seats) => {
      return seats.sort((a, b) => {
        const getNumberSeat = (seatNumber: string) => {
          return Number(seatNumber.replace(/^\D+/g, ""));
        };

        const numberSeatA = getNumberSeat(a.seatNumber);
        const numberSeatB = getNumberSeat(b.seatNumber);

        return numberSeatA - numberSeatB;
      });
    });
  },
});
