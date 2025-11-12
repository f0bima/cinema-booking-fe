import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { API } from "../../../../../common/infrastructure/datasource/api";
import FormMessage from "../../../../../common/presentation/component/FormMessage/FormMessage";
import PasswordInput from "../../../../../common/presentation/component/PasswordInput/PasswordInput";
import { loginUsecase } from "../../../application/usecase/login.usecase";
import { authenticationDatasource } from "../../../infrastructure/datasource/authentication.datasource";
import { loginSchema, type TLoginRequest } from "../../schema/login.schema";

const authRepo = authenticationDatasource({ api: API });

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
    loginUsecase({ repo: authRepo })
      .execute({ ...loginRequest })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log({ error: err.data }));
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
