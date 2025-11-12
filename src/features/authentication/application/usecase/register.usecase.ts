import type { IAuthentication } from "../../domain/repository/authentication.repository";

export const registerUsecase = ({ repo }: { repo: IAuthentication }) => ({
  execute: (props: { email: string; password: string; name: string }) =>
    repo.register({ ...props }),
});
