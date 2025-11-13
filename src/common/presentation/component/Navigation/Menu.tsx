import type { TMenu } from "@/common/domain/menu.entity";
import { navigate } from "astro:transitions/client";
import { forwardRef, type ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type Props = Omit<ComponentProps<"button">, "onClick"> & {
  menu: TMenu;
  isActive: boolean;
};

const Menu = forwardRef<HTMLButtonElement, Props>(
  ({ menu, isActive, className, ...props }, ref) => {
    const onClick = () => {
      if (isActive) return;
      navigate(menu.path);
    };

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={twMerge(
          "flex flex-col items-center justify-center p-4",
          isActive ? "" : "hover:bg-red-200",
          isActive ? "text-indigo-500" : "text-gray-700",
          isActive ? "" : "cursor-pointer",
          className,
        )}
        {...props}
      >
        <menu.icon className="text-lg" />
        <span className="text-xs">{menu.name}</span>
      </button>
    );
  },
);

Menu.displayName = "Menu";

export default Menu;
