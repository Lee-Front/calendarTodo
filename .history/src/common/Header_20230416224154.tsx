import React from "react";
import styled from "@emotion/styled";

const HeaderWrapper = styled.div`
  background: #b3f0b3;
  height: 5rem;
`;

const LoginButton = styled.button`
  font-size: 3rem;
  background: #b3f0b3;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <LoginButton>로그인</LoginButton>
    </HeaderWrapper>
  );
};

export default Header;
