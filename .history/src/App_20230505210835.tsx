import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CalendarPage from "./page/CalendarPage";
import TodoPage from "./page/TodoPage";
import Header from "./common/Header";
import { Global } from "@emotion/react";
import { globalStyles } from "./style";
import styled from "@emotion/styled";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoginPage from "./page/LoginPage";
import LoginHeader from "./common/LoginHeader";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <ContentsWrapper>
        {isLoginPage ? (
          <>
            <LoginHeader />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </>
        ) : (
          <>
            <Header />
            <TransitionGroup
              childFactory={(child) => {
                return React.cloneElement(child, {
                  classNames: location.state?.direction || "",
                });
              }}
            >
              <CSSTransition key={location.pathname} timeout={300}>
                <Routes location={location}>
                  <Route path="/" element={<CalendarPage />} />
                  <Route path="/todo" element={<TodoPage />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </>
        )}
      </ContentsWrapper>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  overflow: hidden;
  max-width: 100rem;
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
