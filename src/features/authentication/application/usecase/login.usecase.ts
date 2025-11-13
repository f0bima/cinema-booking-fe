import type { TAuthUser } from "@/features/authentication/domain/entity/authUser.entity";
import type { IAuthentication } from "../../domain/repository/authentication.repository";

const emailAdminTest = import.meta.env.ADMIN_EMAIL_TEST;
const passwordAdminTest = import.meta.env.ADMIN_PASSWORD_TEST;

export const loginUsecase = ({ repo }: { repo: IAuthentication }) => ({
  execute: (props: { email: string; password: string }): Promise<TAuthUser> => {
    const isAdminUserTest =
      props.email === emailAdminTest && props.password === passwordAdminTest;
    if (isAdminUserTest) {
      const adminUser: TAuthUser = {
        user: {
          id: 999,
          email: emailAdminTest,
          name: "Admin Test",
          role: "admin",
        },
        token: "my-secret-token-admin-test",
      };
      return new Promise((resolve) =>
        setTimeout(() => resolve(adminUser), 100),
      );
    }

    return repo.login({ ...props });
  },
});
