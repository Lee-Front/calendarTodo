import React, { useState } from "react";
import { Route, Routes, useLocation, useTransition } from "react-router-dom";
import CalendarPage from "./page/CalendarPage";
import TodoPage from "./page/TodoPage";
import Header from "./common/Header";
import { Global } from "@emotion/react";
import { globalStyles } from "./style";
import styled from "@emotion/styled";

function App() {
  const location = useLocation();
  const [showTransition, setShowTransition] = useState(false);

  const pageTransitions = useTransition(location, {
    from: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0, 0)" },
  });
  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <Header />
      <ContentsWrapper>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
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
  display: flex;
  flex-direction: column;
  flex: 1;
`;
