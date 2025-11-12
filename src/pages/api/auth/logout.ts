import { API } from "@/common/infrastructure/datasource/api";
import { authenticationDatasource } from "@/features/authentication/infrastructure/datasource/authentication.datasource";
import type { APIRoute } from "astro";

const repo = authenticationDatasource({ api: API });
export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      location: "/auth/login",
      "Set-Cookie": `token=; Path=/; HttpOnly; Secure; SameSite=Strict;Max-Age=0`,
    },
  });
};
