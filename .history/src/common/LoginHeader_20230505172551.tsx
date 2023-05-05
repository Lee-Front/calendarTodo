import React from "react";
import styled from "@emotion/styled";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const nav = useNavigate();
  return (
    <HeaderContainer>
      <LogoSpan>마잇</LogoSpan>
    </HeaderContainer>
  );
};

export default LoginHeader;

const HeaderContainer = styled.div`
  height: 6rem;
  background: #c5c5c5;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const LogoSpan = styled.div`
  font-size: 4rem;
`;
