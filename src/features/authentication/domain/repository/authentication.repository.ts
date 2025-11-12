import type { TAuthUser } from "../entity/authUser.entity";
import type { TInputLogin } from "../entity/inputLogin.entity";
import type { TInputRegister } from "../entity/inputRegister.entity";

export interface IAuthentication {
  login: (input: TInputLogin) => Promise<TAuthUser>;
  register: (input: TInputRegister) => Promise<TAuthUser>;
}
