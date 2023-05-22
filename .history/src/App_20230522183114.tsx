import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Global } from "@emotion/react";
import { globalStyles } from "./style";
import styled from "@emotion/styled";
import "./interceptors/axiosInterceptor";

import CalendarPage from "./page/CalendarPage";
import TodoPage from "./page/TodoPage";
import LoginPage from "./page/LoginPage";
import Header from "./components/common/Header";
import LoginHeader from "./components/common/LoginHeader";
import SignUpPage from "./page/SignUpPage";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import useAuthStore from "./stores/useAuthStore";
import "./fonts/SpoqaHanSansNeo.ttf";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";

  const { isAuthenticated } = useAuthStore();

  if (!isLoginPage && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <ContentsWrapper>
        {isLoginPage ? <LoginHeader /> : <Header />}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>

        <TransitionGroup>
          <CSSTransition key={location.pathname} timeout={300}>
            <Routes location={location}>
              <Route path="/" element={<CalendarPage />} />
              <Route path="todo" element={<TodoPage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </ContentsWrapper>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  overflow: hidden;
  max-width: 80rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
