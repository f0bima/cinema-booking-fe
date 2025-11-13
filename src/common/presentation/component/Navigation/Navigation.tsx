import type { TMenu } from "@/common/domain/menu.entity";
import Menu from "@/common/presentation/component/Navigation/Menu";
import { useCallback, useMemo } from "react";
import { IoHome, IoPerson, IoTicket } from "react-icons/io5";
import { MdOutlineQrCodeScanner } from "react-icons/md";

type Props = { currentPathname: string };

const Navigation = (props: Props) => {
  const isActive = useCallback(
    (menu: TMenu) => {
      return props.currentPathname === menu.path;
    },
    [props.currentPathname],
  );

  const menus = useMemo(() => {
    const isAdminPage = props.currentPathname.startsWith("/admin");

    const userMenus: TMenu[] = [
      { path: "/", name: "Home", icon: IoHome },
      { path: "/tickets", name: "Tickets", icon: IoTicket },
      { path: "/profile", name: "Profile", icon: IoPerson },
    ];

    const adminMenus: TMenu[] = [
      { path: "/admin", name: "Home", icon: IoHome },
      {
        path: "/admin/ticket-validations",
        name: "Ticket Scanner",
        icon: MdOutlineQrCodeScanner,
      },
    ];
    return isAdminPage ? adminMenus : userMenus;
  }, [props.currentPathname]);

  return (
    <nav className="shadow-lg-up fixed bottom-0 z-50 flex h-16 w-full max-w-md items-center justify-between gap-4 bg-white">
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
