import { HiOutlineQueueList } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import SidebarComponent from "../../../../components/sidebar";

export function Sidebar() {
  const menuItems = [
    {
      icon: <HiOutlineQueueList />,
      text: "Filas",
      path: "/funcionario",
      exact: true,
    },
    {
      icon: <HiOutlineUser />,
      text: "Conta",
      path: "/perfil",
      exact: true,
    },
  ];

  return (
    <>
      <SidebarComponent menuItems={menuItems} />
    </>
  );
}
