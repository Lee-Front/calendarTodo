import React from "react";
import styled from "@emotion/styled";
import LogoImg from "../../images/myItLogo.svg";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <HeaderContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </HeaderContainer>
  );
};

export default LoginHeader;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  background-color: #ffda26;
`;

const LogoWrapper = styled.div`
  padding: 10rem 0 6rem 0;
  box-sizing: content-box;
  height: 9.9rem;
  width: 18rem;
`;

const Logo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(${LogoImg});
`;
