import { navigate } from "astro:transitions/client";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { twMerge } from "tailwind-merge";
const GoogleSSOButton = () => {
  const onClick = () => {
    axios.get("http://localhost:3000/api/auth/google/").then((response) => {
      console.log(response);
    });
  };
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex items-center justify-center gap-4 rounded-lg border bg-white p-2 shadow-md",
        "hover:shadow-xl",
      )}
    >
      <FcGoogle />
      <span>Login dengan Google</span>
    </button>
    // <a
    //   href="http://localhost:3001/api/auth/google/"
    //   className={twMerge(
    //     "flex items-center justify-center gap-4 rounded-lg border bg-white p-2 shadow-md",
    //     "hover:shadow-xl",
    //   )}
    // >
    //   <FcGoogle />
    //   <span>Login dengan Google</span>
    // </a>
  );
};

export default GoogleSSOButton;
