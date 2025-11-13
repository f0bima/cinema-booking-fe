import { authUtils } from "@/common/libs/utils/auth.utils";
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(
  async ({ request, redirect, url, cookies }, next) => {
    const protectedRoutes = ["/tickets", "/studio-seats", "/profile"];
    const pathname = url.pathname;

    const token = authUtils.getToken({ request });

    const isHomePage = pathname === "/";
    // const isAuthPage = pathname.startsWith("/auth") && pathname !== "/auth/logout";
    const isAuthPage = pathname.startsWith("/auth");

    console.log({ middlewareToken: token, pathname });
    if (isAuthPage && token) return redirect("/");

    const isProtectedRoutes = protectedRoutes.find((protectedRoute) =>
      pathname.startsWith(protectedRoute),
    );

    if ((isHomePage || isProtectedRoutes) && !token)
      return redirect("/auth/login");

    if (request.url.includes("/login") || request.url.includes("/api/auth"))
      return next();

    return next();
  },
);
