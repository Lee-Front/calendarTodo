import React from "react";
import styled from "@emotion/styled";
import Profile from "./Profile";
import LogoImg from "../images/myItLogo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  return (
    <HeaderContainer>
      <SideWrapper>
        <LogoWrapper>
          <Logo href="/" />
        </LogoWrapper>
      </SideWrapper>
      <SideWrapper>
        <LoginButton
          onClick={() => {
            nav("/login", {
              state: {
                direction: "right",
              },
            });
          }}
        >
          로그인
        </LoginButton>
        <Profile />
      </SideWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 7rem;
  background: #ffda26;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 0.2rem solid white;
`;

const SideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoWrapper = styled.div`
  padding: 1rem;
  box-sizing: content-box;
  height: 4rem;
  width: 7.3rem;
`;

const Logo = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(${LogoImg});
`;
const LoginButton = styled.button`
  height: 3.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  word-break: keep-all;
  font-size: 1.8rem;
  background: white;
  border-radius: 0.5rem;
  cursor: pointer;
  color: black;
`;
