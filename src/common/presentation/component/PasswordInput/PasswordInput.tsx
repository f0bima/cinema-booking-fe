import { forwardRef, type ComponentProps } from "react";

type Props = ComponentProps<"input">;

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return <input ref={ref} type="password" {...props} />;
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
