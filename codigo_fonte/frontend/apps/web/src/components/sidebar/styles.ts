import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const SidebarBackground = styled.div<{ $isExpanded: boolean }>`
  position: absolute;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  z-index: 10;

  transition: all ease 0.4s;

  display: ${(props) => (props.$isExpanded ? "block" : "none")};

  background-color: ${(props) =>
    props.$isExpanded ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
`;

export const LogoTitle = styled.h1<{ $isExpanded: boolean }>`
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  display: ${(props) => (props.$isExpanded ? "block" : "none")};
`;

export const SidebarContainer = styled.div<{ $isExpanded: boolean }>`
  width: ${(props) => (props.$isExpanded ? "180px" : "70px")};
  height: 100vh;
  background-color: ${color.front};
  color: ${color.text};
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 11;
`;

export const LogoImage = styled.img`
  width: 30px;
  aspect-ratio: 1/1;
`;

export const LogoSection = styled.div<{ $isExpanded: boolean }>`
  padding: 20px;
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: ${(props) => (props.$isExpanded ? "24px" : "16px")};
  font-weight: bold;
  white-space: nowrap;
  text-align: ${(props) => (props.$isExpanded ? "left" : "center")};
`;

export const MenuSection = styled.div`
  flex: 1;
  padding: 20px 0;
`;

export const BottomSection = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const ExpandButton = styled.button<{ $isExpanded: boolean }>`
  width: fit-content;
  padding: 10px;
  color: ${color.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${color.gray};
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li<{ $isExpanded: boolean }>`
  padding: 12px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isExpanded ? "flex-start" : "center")};

  &:hover {
    background-color: ${color.gray}88;
  }

  &.active {
    background-color: ${color.gray};
    & * {
      font-weight: 500;
    }
  }
`;

export const MenuIcon = styled.span<{ $isExpanded: boolean }>`
  & svg {
    height: 15px;
    width: 15px;
  }
  margin-right: ${(props) => (props.$isExpanded ? "20px" : "0")};
`;

export const MenuText = styled.span<{ $isExpanded: boolean }>`
  font-size: 13px;
  white-space: nowrap;
  opacity: ${(props) => (props.$isExpanded ? 1 : 0)};
  display: ${(props) => (props.$isExpanded ? "block" : "none")};
  transition: opacity 0.2s;
`;

export const MainContent = styled.main<{ $isExpanded: boolean }>`
  margin-left: ${(props) => (props.$isExpanded ? "250px" : "60px")};
  padding: 40px;
  min-height: 100vh;
  background-color: #ecf0f1;
  transition: margin-left 0.3s ease;
`;
