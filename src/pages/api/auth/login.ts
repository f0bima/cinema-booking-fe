import { API_GATEWAY } from "@/common/infrastructure/datasource/apiGateway";
import { errorUtils } from "@/common/libs/utils/error.utils";
import { loginUsecase } from "@/features/authentication/application/usecase/login.usecase";
import { authenticationDatasource } from "@/features/authentication/infrastructure/datasource/authentication.datasource";
import type { APIRoute } from "astro";

const repo = authenticationDatasource({ api: API_GATEWAY });
export const POST: APIRoute = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  return loginUsecase({ repo })
    .execute({ email, password })
    .then((response) => {
      const headers = new Headers();

      headers.append(
        "Set-Cookie",
        `user=${JSON.stringify(response.user)}; Path=/; HttpOnly; SameSite=Strict;`,
      );
      headers.append(
        "Set-Cookie",
        `token=${response.token}; Path=/; HttpOnly; SameSite=Strict; `,
      );
      headers.append("Content-Type", "application/json");

      return new Response(JSON.stringify({ ...response }), {
        status: 200,
        headers,
        // headers: {
        //   // "Set-Cookie": `token=${response.token}; Path=/; HttpOnly; Secure; SameSite=Strict; `,
        //   // "Set-Cookie": `token=${response.token}; Path=/; HttpOnly; SameSite=Strict; `,
        //   "Content-Type": "application/json",
        //   ...headers,
        // },
      });
    })
    .catch((error) => {
      const message = errorUtils.getErrorAPIMessage(error);
      const statusCode = errorUtils.getErrorAPIStatusCode(error);
      return new Response(JSON.stringify({ error: message }), {
        status: statusCode,
      });
    });
};
