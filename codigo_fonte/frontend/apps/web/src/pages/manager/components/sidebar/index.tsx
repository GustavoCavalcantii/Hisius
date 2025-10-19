import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { HiOutlineUser } from 'react-icons/hi2';
import { TbGraph } from "react-icons/tb";
import SidebarComponent from "../../../../components/sidebar";

export function Sidebar() {
  const menuItems = [
    {
      icon: <HiOutlineHome />,
      text: "Principal",
      path: "/admin",
    },
    {
      icon: <TbGraph />,
      text: "Relatório",
      path: "/admin/relatorio",
    },
    {
      icon: <HiOutlineUserGroup />,
      text: "Funcionários",
      path: "/admin/funcionarios",
    },
    {
      icon: <HiOutlineUser />,
      text: "Conta",
      path: "/admin/perfil",
    },
  ];

  return (
    <>
      <SidebarComponent menuItems={menuItems} />
    </>
  );
}
