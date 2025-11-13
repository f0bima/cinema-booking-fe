import { PROXY_API } from "@/common/infrastructure/datasource/proxyApi";
import Button from "@/common/presentation/component/Button/Button";
import { navigate } from "astro:transitions/client";
import { forwardRef, type ComponentProps } from "react";

type Props = Omit<ComponentProps<"button">, "onClick">;
const LogoutButton = forwardRef<HTMLButtonElement, Props>(
  ({ ...props }, ref) => {
    const onLogout = () => {
      PROXY_API.get("/auth/logout", { withCredentials: true }).then(() =>
        navigate("/auth/login"),
      );
    };
    return (
      <Button onClick={onLogout} {...props}>
        Logout
      </Button>
    );
  },
);

LogoutButton.displayName = "LogoutButton";

export default LogoutButton;
