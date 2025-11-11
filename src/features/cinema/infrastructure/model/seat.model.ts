import type { TStudioModel } from "../../../cinema/infrastructure/model/studio.model";

export type TSeatModel = {
  id: number;
  studio_id: number;
  seat_number: string;
  is_available: boolean;
  studio: TStudioModel;
  studio_name: string;
  created_at: Date;
  updated_at: Date;
};
