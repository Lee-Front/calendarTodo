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
  const [prevSide, setPrevSide] = useState<string | null>(null);
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    setPrevSide(prevSide === "left" ? "right" : "left");
  }, [location.pathname]);
  return (
    <Wrapper>
      <Global styles={globalStyles} />
      {isLoginPage ? <LoginHeader /> : <Header />}
      <ContentsWrapper>
        <TransitionGroup
          childFactory={(child) => {
            return React.cloneElement(child, {
              classNames: prevSide || "",
            });
          }}
        >
          <CSSTransition key={location.pathname} timeout={300}>
            <Routes location={location}>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/todo" element={<TodoPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <Routes location={location}>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
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
