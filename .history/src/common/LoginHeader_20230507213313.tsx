import React from "react";
import styled from "@emotion/styled";
import LogoImg from "../../public/images/myItLogo.svg";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <HeaderContainer>
      <LogoWrapper>
        <Logo to="/" />
      </LogoWrapper>
    </HeaderContainer>
  );
};

export default LoginHeader;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  border-top: 0.2rem solid white;
  background-color: #ffda26;
`;

const LogoWrapper = styled.div`
  padding: 5rem;
  box-sizing: content-box;
  height: 9.9rem;
  width: 18rem;
`;

const Logo = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(${LogoImg});
`;
