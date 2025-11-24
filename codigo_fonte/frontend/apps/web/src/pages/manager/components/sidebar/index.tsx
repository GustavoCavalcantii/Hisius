import { HiOutlineClock, HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { TbGraph } from "react-icons/tb";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import SidebarComponent from "../../../../components/sidebar";

export function Sidebar() {
  const menuItems = [
    {
      icon: <HiOutlineHome />,
      text: "Principal",
      path: "/admin",
      exact: true,
    },
    {
      icon: <TbGraph />,
      text: "Relatório",
      path: "/admin/relatorio",
      exact: true,
    },
    {
      icon: <HiOutlineUserGroup />,
      text: "Funcionários",
      path: "/admin/funcionarios",
      exact: true,
    },
    {
      icon: <HiOutlineClock />,
      text: "Atividades",
      path: "/admin/logs",
      exact: true,
    },
    {
      icon: <HiOutlineInformationCircle />,
      text: "Administradores",
      path: "/admin/admins",
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
