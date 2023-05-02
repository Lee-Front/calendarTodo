import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./page/Calendar";
import TodoList from "./page/TodoList";
import Header from "./common/Header";
import styled from "@emotion/styled";

const StyleWrapper = styled.div``;

function App() {
  return (
    <StyleWrapper>
      <Header />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </StyleWrapper>
  );
}

export default App;
