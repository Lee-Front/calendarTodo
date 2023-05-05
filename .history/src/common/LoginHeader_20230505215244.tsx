import React from "react";
import styled from "@emotion/styled";
import LogoImg from "../../public/images/myItLogo.svg";
//import LogoImg from "../images/myItLogo.svg";
//import LogoImg from "../images/myItLogo.svg";

const LoginHeader = () => {
  console.log("process.env.PUBLIC_URL : ", process.env.PUBLIC_URL);
  return (
    <HeaderContainer>
      <LogoWrapper>
        <Logo href="/" />
      </LogoWrapper>
    </HeaderContainer>
  );
};

export default LoginHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  border-top: 0.2rem solid white;
`;

const LogoWrapper = styled.div`
  padding: 5rem;
  box-sizing: content-box;
  height: 9.9rem;
  width: 18rem;
`;

const Logo = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(${LogoImg});
`;
