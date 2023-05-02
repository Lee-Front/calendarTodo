import React, { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import CalendarPage from "./page/CalendarPage";
import TodoPage from "./page/TodoPage";
import Header from "./common/Header";
import { Global } from "@emotion/react";
import { globalStyles } from "./style";
import styled from "@emotion/styled";

const { worker } = require("./mocks/browser");
const MswContext = createContext(worker);

function App() {
  return (
    <MswContext.Provider value={worker}>
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
    </MswContext.Provider>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentsWrapper = styled.div`
  flex: 1;
`;
