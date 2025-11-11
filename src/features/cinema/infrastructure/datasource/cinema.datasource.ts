import type { AxiosInstance } from "axios";

import type { TStudio } from "../../domain/entity/studio.entity";

import type { TSeat } from "../../domain/entity/seat.entity";
import type { ICinema } from "../../domain/repository/cinema.repository";
import { seatMapper } from "../mapper/seat.mapper";
import { studioMapper } from "../mapper/studio.mapper";
import type { TSeatModel } from "../model/seat.model";
import type { TStudioModel } from "../model/studio.model";

export const cinemaDatasource = ({ api }: { api: AxiosInstance }): ICinema => ({
  getStudios: async function (): Promise<TStudio[]> {
    return await api.get("/cinema/studios").then((response) => {
      const studioModels = response.data as TStudioModel[];
      return studioMapper.toEntities(studioModels);
    });
  },
  getStudioSeats: async function (props: {
    studioId: number;
  }): Promise<TSeat[]> {
    return await api
      .get(`http://localhost:3000/api/cinema/studios/${props.studioId}/seats`)
      .then((response) => {
        const seatModels = response.data as TSeatModel[];
        return seatMapper.toEntities(seatModels);
      });
  },
});
