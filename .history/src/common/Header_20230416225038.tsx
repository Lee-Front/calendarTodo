import React from "react";
import styled from "@emotion/styled";

const HeaderWrapper = styled.div`
  height: 5rem;
  align-items: center;
  background: #c5c5c5;
  display: flex;
  justify-content: flex-end;
`;

const LoginButton = styled.button`
  margin-right: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
  background: #b2e9b2;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <LoginButton>로그인</LoginButton>
    </HeaderWrapper>
  );
};

export default Header;
