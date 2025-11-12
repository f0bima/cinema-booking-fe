import type { TUser } from "./user.entity";

export type TAuthUser = {
  user: TUser;
  token: string;
};
