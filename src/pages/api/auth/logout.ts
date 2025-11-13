import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const headers = new Headers();

  headers.append(
    "Set-Cookie",
    `user=; Path=/; HttpOnly; SameSite=Strict;Max-Age=0`,
  );
  headers.append(
    "Set-Cookie",
    `token=; Path=/; HttpOnly; SameSite=Strict;Max-Age=0 `,
  );
  headers.set("location", "/auth/login");
  return new Response(null, {
    status: 302,
    headers,
    // headers: {
    //   location: "/auth/login",
    //   ...headers,
    //   "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict;Max-Age=0`,
    // },
  });
};
