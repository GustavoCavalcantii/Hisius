import { HiQueueList } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import SidebarComponent from "../../../../components/sidebar";

export function Sidebar() {
  const menuItems = [
    {
      icon: <HiQueueList />,
      text: "Filas",
      path: "funcionario",
    },
    {
      icon: <HiOutlineUser />,
      text: "Perfil",
      path: "funcionario/perfil",
    },
  ];

  return (
    <>
      <SidebarComponent menuItems={menuItems} />
    </>
  );
}
