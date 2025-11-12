import type { AxiosInstance } from "axios";
import type { IAuthentication } from "../../domain/repository/authentication.repository";
import type { TAuthUser } from "../../domain/entity/authUser.entity";
import type { TInputLogin } from "../../domain/entity/inputLogin.entity";
import type { TInputRegister } from "../../domain/entity/inputRegister.entity";
import type { TAuthUserModel } from "../model/authUser.model";

export const authenticationDatasource = ({
  api,
}: {
  api: AxiosInstance;
}): IAuthentication => ({
  login: async function (input: TInputLogin): Promise<TAuthUser> {
    return api.post("/auth/login", input).then((response) => {
      const authUserModel = response.data as TAuthUserModel;
      const authUser = authUserModel;
      return authUser;
    });
  },
  register: async function (input: TInputRegister): Promise<TAuthUser> {
    return api.post("/auth/register", input).then((response) => {
      const authUserModel = response.data as TAuthUserModel;
      const authUser = authUserModel;
      return authUser;
    });
  },
});
