import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CalendarPage from "./page/CalendarPage";
import TodoPage from "./page/TodoPage";
import Header from "./common/Header";
import { Global } from "@emotion/react";
import { globalStyles } from "./style";
import styled from "@emotion/styled";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  const location = useLocation();
  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <Header />
      <ContentsWrapper>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={300}
            classNames="page-transition"
          >
            <Routes location={location}>
              <Route path="/" element={<TodoPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </ContentsWrapper>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
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
