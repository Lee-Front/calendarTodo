import React from "react";
import styled from "@emotion/styled";
import LogoImg from "../images/myItLogo.svg";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const nav = useNavigate();
  return (
    <HeaderContainer>
      <LogoWrapper>
        <Logo href="#" />
      </LogoWrapper>
    </HeaderContainer>
  );
};

export default LoginHeader;

const HeaderContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const LogoWrapper = styled.div`
  height: 6rem;
  width: 5rem;
`;

const Logo = styled.a`
  display: block;
  height: 100%;
  background-image: url(${LogoImg});
`;
