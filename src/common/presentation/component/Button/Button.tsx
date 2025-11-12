import { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & {};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge("rounded-lg bg-slate-200 p-2", className)}
        {...props}
      >
        {props.children}
      </button>
    );
  },
);
Button.displayName = "Button";

export default Button;
