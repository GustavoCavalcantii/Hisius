import { color } from "@hisius/ui/theme/colors";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  background-color: ${color.background};
`;

export const ProfileContainer = styled.div`
  flex: 1;
  background-color: ${color.background};
  padding: 24px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 32px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${color.text};
  margin-bottom: 8px;
  padding-left: 12px;
  border-left: 3px solid ${color.primary};
`;

export const InputGroup = styled.div`
  width: 100%;
`;

export const SecurityActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SecurityItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${color.front};
  border-radius: 12px;
  border: 1px solid ${color.gray};
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${color.gray};
  }
`;

export const SecurityIcon = styled.div`
  margin-right: 12px;
`;

export const SecurityTextContainer = styled.div`
  flex: 1;
`;

export const StyledIcon = styled(HiOutlineArrowRightOnRectangle)`
  & path {
    color: ${color.error.error};
  }
`;

export const SecurityTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${color.text};
  margin-bottom: 2px;
  display: block;
`;

export const SecurityDescription = styled.span`
  font-size: 14px;
  color: ${color.text};
  display: block;
`;

export const ActionsContainer = styled.div`
  margin-top: 40px;
  gap: 24px;
`;

export const PopupText = styled.p`
  font-size: 14px;
  margin-bottom: 2rem;
  text-align: center;
`;
