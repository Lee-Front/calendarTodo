import React from "react";
import styled from "@emotion/styled";
import Profile from "./Profile";
import LogoImg from "../../images/myItLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth";

const Header = () => {
  const nav = useNavigate();
  const { userId, profileImg, isAuthenticated } = useAuthStore((state) => ({
    userId: state.userId,
    isAuthenticated: state.isAuthenticated,
    profileImg: state.profileImg,
  }));

  const handlegoToLogin = () => {
    nav("/login", {
      state: {
        direction: "right",
      },
    });
  };

  const handlegoToHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    nav("/", {
      state: {
        direction: "right",
      },
    });
  };

  return (
    <HeaderContainer>
      <SideWrapper>
        <LogoWrapper>
          <Logo to="/" onClick={handlegoToHome} />
        </LogoWrapper>
      </SideWrapper>
      <SideWrapper>
        {isAuthenticated ? <Profile /> : <LoginButton onClick={handlegoToLogin}>로그인</LoginButton>}
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

const Logo = styled(Link)`
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
