import type { TMenu } from "@/common/domain/menu.entity";
import Menu from "@/common/presentation/component/Navigation/Menu";
import { useCallback } from "react";

import { IoHome, IoPerson, IoTicket } from "react-icons/io5";

type Props = { currentPathname: string };
const menus: TMenu[] = [
  { path: "/", name: "Home", icon: IoHome },
  { path: "/tickets", name: "Tickets", icon: IoTicket },
  { path: "/profile", name: "Profile", icon: IoPerson },
];
const Navigation = (props: Props) => {
  const isActive = useCallback(
    (menu: TMenu) => {
      return props.currentPathname === menu.path;
    },
    [props.currentPathname],
  );
  return (
    <nav className="shadow-lg-up fixed bottom-0 flex h-16 w-full max-w-md items-center justify-between gap-4">
      {menus.map((menu, i) => (
        <div className="flex h-full flex-1 justify-center" key={i}>
          <Menu
            menu={menu}
            isActive={isActive(menu)}
            className="flex h-full justify-center"
          />
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
