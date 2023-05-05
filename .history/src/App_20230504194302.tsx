import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CalendarPage from "./page/CalendarPage";
import TodoPage from "./page/TodoPage";
import Header from "./common/Header";
import { Global } from "@emotion/react";
import { globalStyles } from "./style";
import styled from "@emotion/styled";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoginPage from "./page/LoginPage";

function App() {
  const location = useLocation();
  const slideSide = useRef("left");
  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <Header />
      <ContentsWrapper>
        <TransitionGroup
          childFactory={(child) => {
            const side = slideSide.current;
            slideSide.current = side === "left" ? "right" : "left";
            return React.cloneElement(child, {
              classNames: side,
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
