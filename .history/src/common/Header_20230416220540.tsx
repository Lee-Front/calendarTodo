import React from "react";
import styled from "@emotion/styled";

const HeaderWrapper = styled.div`
  height: 4rem;
`;

const LoginButton = styled.div`
  font-size: 3rem;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <LoginButton>로그인</LoginButton>
    </HeaderWrapper>
  );
};

export default Header;
