import { useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BottomSection,
  ExpandButton,
  LogoImage,
  LogoSection,
  LogoTitle,
  MenuIcon,
  MenuItem,
  MenuList,
  MenuSection,
  MenuText,
  SidebarBackground,
  SidebarContainer,
} from "./styles";
import logo from "@hisius/ui/assets/images/logo.png";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

interface Routes {
  icon: ReactNode;
  text: string;
  path: string;
  exact?: boolean;
}

interface SidebarProps {
  menuItems: Routes[];
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const location = useLocation();

  const isActive = (path: string, exact?: boolean) => {
    const currentPath = location.pathname;

    if (exact) {
      return path === currentPath;
    }

    return currentPath.startsWith(path + "/") || path === currentPath;
  };

  return (
    <>
      <SidebarBackground $isExpanded={isExpanded} />
      <SidebarContainer $isExpanded={isExpanded}>
        <LogoSection
          $isExpanded={isExpanded}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <LogoImage src={logo} alt="Logo" />
          <LogoTitle $isExpanded={isExpanded}>Hisius</LogoTitle>
        </LogoSection>

        <MenuSection>
          <MenuList>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                $isExpanded={isExpanded}
                className={isActive(item.path, item.exact) ? "active" : ""}
                onClick={() => handleMenuItemClick(item.path)}
              >
                <MenuIcon $isExpanded={isExpanded}>{item.icon}</MenuIcon>
                <MenuText $isExpanded={isExpanded}>{item.text}</MenuText>
              </MenuItem>
            ))}
          </MenuList>
        </MenuSection>

        <BottomSection>
          <ExpandButton onClick={handleExpand} $isExpanded={isExpanded}>
            <TbLayoutSidebarLeftExpand />
          </ExpandButton>
        </BottomSection>
      </SidebarContainer>
    </>
  );
}
