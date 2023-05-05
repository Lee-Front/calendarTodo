import React from "react";
import styled from "@emotion/styled";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  return (
    <HeaderContainer>
      <SideWrapper>
        <LogoSpan>마잇</LogoSpan>
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
  height: 6rem;
  background: #c5c5c5;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const SideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoSpan = styled.div`
  font-size: 4rem;
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
const LoginButton = styled.button`
  height: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  word-break: keep-all;
  font-size: 1.8rem;
  background: #b2e9b2;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
`;
