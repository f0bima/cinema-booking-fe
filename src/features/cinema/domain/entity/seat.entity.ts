import type { TStudio } from "./studio.entity";

export type TSeat = {
  id: number;
  studioId: number;
  seatNumber: string;
  isAvailable: boolean;
  studio: TStudio;
  studioName: string;
  createdAt: Date;
  updatedAt: Date;
};
