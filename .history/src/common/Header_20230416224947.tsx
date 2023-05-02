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
  padding: 0.5rem;
  font-size: 2rem;
  background: #99cc99;
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
