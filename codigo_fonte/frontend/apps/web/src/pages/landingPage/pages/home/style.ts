import styled from 'styled-components';
import { color } from '@hisius/ui/theme/colors';

export const NavBar = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Logotipo = styled.h1`
    font-size: 1.5rem;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

export const Hero = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
    right: 0;
    margin-left: 7%;
    margin-top: 5%;
`;

export const HeroContent = styled.div`
    max-width: 500px;
    margin-bottom: 100px;
    gap: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HeroTitle = styled.h1`
    font-size: 2.5rem;
    color: ${color.text};
    align-self: flex-start;
`;

export const HisiusText = styled.span`
    color: ${color.primary};
    font-weight: bold;
    font-size: 2.5rem;
`;

export const HeroDescription = styled.p`
    font-size: 20px;
    color: ${color.text};
`;

export const HeroImage = styled.img`
    width: 50%;
    object-fit: cover;
`;