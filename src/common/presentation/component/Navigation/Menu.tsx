import type { TMenu } from "@/common/domain/menu.entity";
import { navigate } from "astro:transitions/client";
import { forwardRef, type ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & { menu: TMenu; isActive: boolean };

const Menu = forwardRef<HTMLButtonElement, Props>(
  ({ menu, className, ...props }, ref) => {
    const onClick = () => {
      if (props.isActive) return;
      navigate(menu.path);
    };

    return (
      <button
        onClick={onClick}
        className={twMerge(
          "flex flex-col items-center justify-center p-4",
          props.isActive ? "" : "hover:bg-red-200",
          props.isActive ? "text-indigo-500" : "text-gray-700",
          props.isActive ? "" : "cursor-pointer",
          className,
        )}
      >
        <menu.icon className="text-lg" />
        <span className="text-xs">{menu.name}</span>
      </button>
    );
  },
);

export default Menu;
