import { userSchema } from "@/features/authentication/domain/entity/user.entity";
import type { AstroCookies } from "astro";

export const authUtils = {
  getToken: ({ cookies }: { cookies: AstroCookies }) => {
    const token = cookies.get("token")?.value;
    return token;
  },
  getUser: ({ cookies }: { cookies: AstroCookies }) => {
    const userFromCookies = cookies.get("user")?.value;
    try {
      const userParse = userSchema.safeParse(JSON.parse(userFromCookies));
      return userParse?.data;
    } catch (error) {
      console.error("Error parse user ");
      return null;
    }
  },
};
