import Button from "@/common/presentation/component/Button/Button";
import FormGroup from "@/common/presentation/component/FormGroup/FormGroup";
import Input from "@/common/presentation/component/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { API } from "../../../../../common/infrastructure/datasource/api";
import FormMessage from "../../../../../common/presentation/component/FormMessage/FormMessage";
import PasswordInput from "../../../../../common/presentation/component/PasswordInput/PasswordInput";
import { registerUsecase } from "../../../application/usecase/register.usecase";
import { authenticationDatasource } from "../../../infrastructure/datasource/authentication.datasource";
import {
  registerSchema,
  type TRegisterReguest,
} from "../../schema/register.schema";
import { toast } from "sonner";
import { navigate } from "astro:transitions/client";

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
      .then(() => {
        toast.info(
          "Registration successful! Please log in to access cinema bookings.",
        );
        navigate("/auth/login");
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };
  return (
    <form onSubmit={control.handleSubmit(onRegister)} className="space-y-4">
      <FormGroup label="Email">
        <Input placeholder="email" type="email" {...register("email")} />
        <FormMessage error={errors.email} />
      </FormGroup>
      <FormGroup label="Name">
        <Input placeholder="name" type="text" {...register("name")} />
        <FormMessage error={errors.name} />
      </FormGroup>
      <FormGroup label="Password">
        <PasswordInput placeholder="password" {...register("password")} />
        <FormMessage error={errors.password} />
      </FormGroup>
      <FormGroup label="Password Confirmation">
        <PasswordInput
          placeholder="password confirmation"
          {...register("passwordConfirmation")}
        />
        <FormMessage error={errors.passwordConfirmation} />
      </FormGroup>
      <Button type="submit" disabled={!isValid} className="w-full">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
