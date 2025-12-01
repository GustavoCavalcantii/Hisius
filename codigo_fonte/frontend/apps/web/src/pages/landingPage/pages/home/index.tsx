import React from "react";
import * as S from "./style";
import CustomButtom from "@hisius/ui/components/Button";
import indexImage from "../../../../../public/indexImage.png";

export const HomePage: React.FC = () => {
    return (
        <>
            <S.NavBar>
                <S.Logotipo>HISIUS</S.Logotipo>
                <S.ButtonContainer>
                    <CustomButtom title="Cadastre-se" onPress={() => {}} />
                    <CustomButtom title="Login" onPress={() => {}} />
                </S.ButtonContainer>
            </S.NavBar>

            <S.Hero>
            <S.HeroContent>
                <S.HeroTitle>
                    Agilize seus processos<br />
                    e diminua as filas<br />
                    com <S.HisiusText>HISIUS</S.HisiusText>
                </S.HeroTitle>

                <S.HeroDescription>
                    Tecnologia inteligente para otimizar seus processos e oferecer uma experiência excepcional aos seus pacientes. Mais eficiência, menos esperas.
                </S.HeroDescription>

                <CustomButtom title="Começar agora" style={{ width: '60%' }} onPress={() => {}} />
            </S.HeroContent>

            <S.HeroImage src={indexImage} alt="Imagem ilustrativa" />

            

        </S.Hero>
        </>
    );
}