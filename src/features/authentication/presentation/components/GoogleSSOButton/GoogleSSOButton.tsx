import { FcGoogle } from "react-icons/fc";
import { twMerge } from "tailwind-merge";
const GoogleSSOButton = () => {
  return (
    <a
      href="/api/auth/google-sso"
      className={twMerge(
        "flex items-center justify-center gap-4 rounded-lg border bg-white p-2 shadow-md",
        "hover:shadow-xl",
      )}
    >
      <FcGoogle />
      <span>Login dengan Google</span>
    </a>
  );
};

export default GoogleSSOButton;
