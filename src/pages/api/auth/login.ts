import { API } from "@/common/infrastructure/datasource/api";
import { loginUsecase } from "@/features/authentication/application/usecase/login.usecase";
import { authenticationDatasource } from "@/features/authentication/infrastructure/datasource/authentication.datasource";
import type { APIRoute } from "astro";

const repo = authenticationDatasource({ api: API });
export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  return loginUsecase({ repo })
    .execute({ email, password })
    .then((response) => {
      return new Response(JSON.stringify({ ...response }), {
        status: 200,
        headers: {
          "Set-Cookie": `token=${response.token}; Path=/; HttpOnly; Secure; SameSite=Strict; `,
          "Content-Type": "application/json",
        },
      });
    })
    .catch((err) => {
      return new Response(JSON.stringify({ error: err.data }), { status: 401 });
    });
};
