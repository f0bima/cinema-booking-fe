import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormMessage from "../../../../../common/presentation/component/FormMessage/FormMessage";
import PasswordInput from "../../../../../common/presentation/component/PasswordInput/PasswordInput";

import { loginSchema, type TLoginRequest } from "../../schema/login.schema";
import { toast } from "sonner";
import { navigate } from "astro:transitions/client";
import { PROXY_API } from "@/common/infrastructure/datasource/proxyApi";

const LoginForm = () => {
  const {
    control,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onLogin = (loginRequest: TLoginRequest) => {
    PROXY_API.post("/auth/login", loginRequest)
      .then(async (res) => {
        toast.info("success login");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.data);
      });
  };
  return (
    <form onSubmit={control.handleSubmit(onLogin)}>
      <input placeholder="email" type="email" {...register("email")} />
      <FormMessage error={errors.email} />

      <PasswordInput placeholder="password" {...register("password")} />
      <FormMessage error={errors.password} />

      <button type="submit" disabled={!isValid}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
