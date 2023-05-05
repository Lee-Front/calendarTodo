import React from "react";
import styled from "@emotion/styled";
import Logo from "./myItLogo.svg";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const nav = useNavigate();
  return (
    <HeaderContainer>
      <Logo></Logo>
    </HeaderContainer>
  );
};

export default LoginHeader;

const HeaderContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const LogoSpan = styled.div`
  font-size: 4rem;
`;
