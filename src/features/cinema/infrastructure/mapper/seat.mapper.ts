import type { TSeat } from "../../domain/entity/seat.entity";
import type { TSeatModel } from "../model/seat.model";
import { studioMapper } from "./studio.mapper";

const toSeatEntity = (model: TSeatModel): TSeat => {
  return {
    id: model.id,
    studio: studioMapper.toEntity(model.studio),
    studioName: model.studio_name,
    studioId: model.studio_id,
    isAvailable: model.is_available,
    seatNumber: model.seat_number,
    createdAt: model.created_at,
    updatedAt: model.updated_at,
  };
};
export const seatMapper = {
  toEntity: toSeatEntity,
  toEntities: (models: TSeatModel[]): TSeat[] => models.map(toSeatEntity),
};
