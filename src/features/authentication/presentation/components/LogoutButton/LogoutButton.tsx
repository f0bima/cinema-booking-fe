import { PROXY_API } from "@/common/infrastructure/datasource/proxyApi";
import Button from "@/common/presentation/component/Button/Button";
import { navigate } from "astro:transitions/client";

const LogoutButton = () => {
  const onLogout = () => {
    PROXY_API.get("/auth/logout").then(() => navigate("/auth/login"));
  };
  return <Button onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
