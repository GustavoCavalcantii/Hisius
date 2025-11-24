import { HiOutlineQueueList } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import SidebarComponent from "../../../../components/sidebar";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export function Sidebar() {
  const menuItems = [
    {
      icon: <HiOutlineQueueList />,
      text: "Filas",
      path: "/funcionario",
      exact: true,
    },
    {
      icon: <HiOutlineBuildingOffice2 />,
      text: "Salas",
      path: "/funcionario/salas",
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
