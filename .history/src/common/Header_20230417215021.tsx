import React from "react";
import styled from "@emotion/styled";
import Profile from "./Profile";

const Header = () => {
  return (
    <HeaderContainer>
      <SideWrapper>
        <div>마잇</div>
      </SideWrapper>

      <SideWrapper>
        <LoginButton>로그인</LoginButton>
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
  justify-content: flex-end;
  padding-right: 1rem;
`;

const SideWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 1rem;
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
