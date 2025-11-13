import { FcGoogle } from "react-icons/fc";
import { twMerge } from "tailwind-merge";

const GOOGLE_SSO_URL = import.meta.env.PUBLIC_GOOGLE_SSO_URL;
const GoogleSSOButton = () => {
  return (
    <a
      href={GOOGLE_SSO_URL}
      className={twMerge(
        "flex items-center justify-center gap-4 rounded-lg border bg-white p-2 shadow-md",
        "hover:shadow-xl",
      )}
    >
      <FcGoogle />
      <span>Google SSO</span>
    </a>
  );
};

export default GoogleSSOButton;
