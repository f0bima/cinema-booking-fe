import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type TRegisterReguest,
} from "../../schema/register.schema";
import PasswordInput from "../../../../../common/presentation/component/PasswordInput/PasswordInput";
import FormMessage from "../../../../../common/presentation/component/FormMessage/FormMessage";
import { registerUsecase } from "../../../application/usecase/register.usecase";
import { authenticationDatasource } from "../../../infrastructure/datasource/authentication.datasource";
import { API } from "../../../../../common/infrastructure/datasource/api";

const authRepo = authenticationDatasource({ api: API });

const RegisterForm = () => {
  const {
    control,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onRegister = (registerRequest: TRegisterReguest) => {
    console.log(registerRequest);

    registerUsecase({ repo: authRepo })
      .execute({ ...registerRequest })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log({
          error: err.data,
        });
      });
  };
  return (
    <form onSubmit={control.handleSubmit(onRegister)}>
      <input placeholder="email" type="email" {...register("email")} />
      <input placeholder="name" type="text" {...register("name")} />
      <FormMessage error={errors.email} />
      <PasswordInput placeholder="password" {...register("password")} />
      <FormMessage error={errors.password} />
      <PasswordInput
        placeholder="password confirmation"
        {...register("passwordConfirmation")}
      />
      <FormMessage error={errors.passwordConfirmation} />
      <button type="submit" disabled={!isValid}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
