import React from "react";
import styled from "@emotion/styled";

const HeaderWrapper = styled.div`
  height: 5rem;
  width: 100%;
  align-items: center;
  vertical-align: middle;
  background: #c5c5c5;
`;

const LoginButton = styled.button`
  float: right;
  font-size: 2.5rem;
  background: #b3f0b3;
  border-radius: 0.5rem;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <LoginButton>로그인</LoginButton>
    </HeaderWrapper>
  );
};

export default Header;
