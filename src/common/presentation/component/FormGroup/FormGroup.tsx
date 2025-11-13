import React, { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"div"> & { label: string };

const FormGroup = forwardRef<HTMLDivElement, Props>(
  ({ label, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge("flex flex-col gap-2", className)}
        {...props}
      >
        <p>{label}</p>
        {children}
      </div>
    );
  },
);

FormGroup.displayName = "FormGroup";

export default FormGroup;
