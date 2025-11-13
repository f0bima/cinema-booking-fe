import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormMessage from "../../../../../common/presentation/component/FormMessage/FormMessage";
import PasswordInput from "../../../../../common/presentation/component/PasswordInput/PasswordInput";

import { PROXY_API } from "@/common/infrastructure/datasource/proxyApi";
import { errorUtils } from "@/common/libs/utils/error.utils";
import Button from "@/common/presentation/component/Button/Button";
import FormGroup from "@/common/presentation/component/FormGroup/FormGroup";
import Input from "@/common/presentation/component/Input/Input";
import type { TAuthUser } from "@/features/authentication/domain/entity/authUser.entity";
import { navigate } from "astro:transitions/client";
import { toast } from "sonner";
import { loginSchema, type TLoginRequest } from "../../schema/login.schema";

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
        const authUser = res as any as TAuthUser;

        const isAdmin = authUser.user.role === "admin";
        const redirectUrl = isAdmin ? "/admin" : "/";

        navigate(redirectUrl);
      })
      .catch((error) => {
        const message = errorUtils.getErrorAPIMessage(error);
        toast.error(message);
      });
  };

  return (
    <form onSubmit={control.handleSubmit(onLogin)} className="space-y-4">
      <FormGroup label="Email">
        <Input placeholder="Email..." type="email" {...register("email")} />
        <FormMessage error={errors.email} />
      </FormGroup>

      <FormGroup label="Password">
        <PasswordInput placeholder="Password..." {...register("password")} />
        <FormMessage error={errors.password} />
      </FormGroup>

      <Button type="submit" disabled={!isValid} className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
