import React from "react";
import styled from "@emotion/styled";

const HeaderWrapper = styled.div`
  height: 6rem;
  align-items: center;
  background: #c5c5c5;
  display: flex;
  justify-content: flex-end;
`;

const LoginButton = styled.button`
  margin-right: 1rem;
  padding: 0.8rem;
  font-size: 1.8rem;
  background: #b2e9b2;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
`;

const UserProfile = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 20%;
  background: #b2e9b2;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <LoginButton>로그인</LoginButton>
      <UserProfile />
    </HeaderWrapper>
  );
};

export default Header;
