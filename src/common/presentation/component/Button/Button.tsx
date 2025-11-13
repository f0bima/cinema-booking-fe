import { forwardRef, useMemo, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & {};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "rounded-lg bg-indigo-200 p-2",
          props.disabled ? "bg-muted cursor-not-allowed" : "cursor-pointer",
          props.disabled ? "" : "hover:bg-indigo-400 hover:text-white",
          className,
        )}
        {...props}
      >
        {props.children}
      </button>
    );
  },
);
Button.displayName = "Button";

export default Button;
