import Input from "@/common/presentation/component/Input/Input";
import {
  forwardRef,
  useState,
  type ComponentProps,
  type MouseEventHandler,
} from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

type Props = ComponentProps<"input">;

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
      setIsShowPassword((prev) => !prev);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={isShowPassword ? "text" : "password"}
          {...props}
          className="w-full"
        />
        <div
          className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
          onClick={toggleShowPassword}
        >
          {isShowPassword ? <LuEyeClosed /> : <LuEye />}
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
