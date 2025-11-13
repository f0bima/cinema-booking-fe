import { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"input"> & {};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge("rounded-xl border px-4 py-2", className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
