import type { IAuthentication } from "../../domain/repository/authentication.repository";

export const loginUsecase = ({ repo }: { repo: IAuthentication }) => ({
  execute: (props: { email: string; password: string }) =>
    repo.login({ ...props }),
});
