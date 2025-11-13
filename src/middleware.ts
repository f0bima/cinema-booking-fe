import { authUtils } from "@/common/libs/utils/auth.utils";
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(
  async ({ request, redirect, url, cookies }, next) => {
    const pathname = url.pathname;
    const isHomePage = pathname === "/";
    const isAdminPage = pathname.startsWith("/admin");
    const isProfilePage = pathname.startsWith("/profile");
    const isAuthPage = pathname.startsWith("/auth");

    const customerPages = ["/tickets", "/studio-seats"];
    const isCustomerPage = customerPages.find((customerPage) =>
      pathname.startsWith(customerPage),
    );

    const isProtectedRoutes =
      isCustomerPage || isAdminPage || isHomePage || isProfilePage;

    const token = authUtils.getToken({ cookies });
    const user = authUtils.getUser({ cookies });
    const isCustomer = user?.role === "customer";
    const isAdmin = user?.role === "admin";

    if (isProtectedRoutes && !token) return redirect("/auth/login");

    if (isAuthPage && token) return redirect("/");

    if (isCustomer && isAdminPage) return redirect("/");
    if (isAdmin && (isCustomerPage || isHomePage)) return redirect("/admin");

    if (request.url.includes("/login") || request.url.includes("/api/auth"))
      return next();

    return next();
  },
);
