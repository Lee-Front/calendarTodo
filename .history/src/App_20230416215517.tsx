import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./page/Calendar";
import TodoList from "./page/TodoList";
import Header from "./common/Header";
import { Global } from "@emotion/react";
import { globalStyles } from "./style";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
`;

function App() {
  return (
    <Wrapper>
      <Global styles={globalStyles} />

      <Header />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Wrapper>
  );
}

export default App;