import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CalendarPage from "./page/CalendarPage";
import TodoPage from "./page/TodoPage";
import Header from "./common/Header";
import { Global } from "@emotion/react";
import { globalStyles } from "./style";
import styled from "@emotion/styled";

function App() {
  const location = useLocation();
  const [showTransition, setShowTransition] = useState(false);

  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <Header />
      <div
        className={`page ${showTransition ? "page-enter" : ""}`}
        onAnimationEnd={() => {
          console.log("?");
          setShowTransition(false);
        }}
      >
        <ContentsWrapper>
          <Routes location={location}>
            <Route path="/" element={<TodoPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </ContentsWrapper>
      </div>
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
  display: flex;
  flex-direction: column;
  flex: 1;
`;
