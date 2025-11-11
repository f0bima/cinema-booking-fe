import type { TSeat } from "../entity/seat.entity";
import type { TStudio } from "../entity/studio.entity";

export interface ICinema {
  getStudios: () => Promise<TStudio[]>;
  getStudioSeats: (props: { studioId: number }) => Promise<TSeat[]>;
}
