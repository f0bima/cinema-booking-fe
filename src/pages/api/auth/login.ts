import { API } from "@/common/infrastructure/datasource/api";
import { loginUsecase } from "@/features/authentication/application/usecase/login.usecase";
import { authenticationDatasource } from "@/features/authentication/infrastructure/datasource/authentication.datasource";
import type { APIRoute } from "astro";

const repo = authenticationDatasource({ api: API });
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
    .catch((err) => {
      return new Response(JSON.stringify({ error: err.data }), { status: 401 });
    });
};
