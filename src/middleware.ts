import { authUtils } from "@/common/libs/utils/auth.utils";
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(
  async ({ request, redirect, url }, next) => {
    const protectedRoutes = ["/tickets", "studio-seats"];
    const pathname = url.pathname;

    const token = authUtils.getToken({ request });

    const isHomePage = pathname === "/";
    const isProtectedRoutes = protectedRoutes.find((protectedRoute) =>
      pathname.startsWith(protectedRoute),
    );

    console.log({ isProtectedRoutes, pathname });

    if ((isHomePage || isProtectedRoutes) && !token)
      return redirect("/auth/login");

    if (request.url.includes("/login") || request.url.includes("/api/auth"))
      return next();

    return next();
  },
);
