import type { TStudio } from "../../../cinema/domain/entity/studio.entity";
import type { TStudioModel } from "../model/studio.model";

const fromStudioEntity = (model: TStudioModel): TStudio => {
  return {
    id: model.id,
    name: model.name,
    totalSeats: model.total_seats,
    createdAt: model.created_at,
    updatedAt: model.updated_at,
  };
};
export const studioMapper = {
  toEntity: fromStudioEntity,
  toEntityList: (models: TStudioModel[]): TStudio[] =>
    models.map(fromStudioEntity),
};
