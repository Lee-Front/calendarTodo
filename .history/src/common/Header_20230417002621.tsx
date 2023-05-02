import React from "react";
import styled from "@emotion/styled";
import Profile from "./Profile";

const HeaderWrapper = styled.div`
  height: 6rem;
  background: #c5c5c5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
  gap: 1rem;
`;

const LoginButton = styled.button`
  padding: 0.8rem;
  font-size: 1.8rem;
  background: #b2e9b2;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <div>
        <LoginButton>로그인</LoginButton>
        <Profile />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
