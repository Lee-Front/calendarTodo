import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./page/Calendar";
import TodoList from "./page/TodoList";
import Header from "./common/Header";
import styled from "@emotion/styled";

const StyleWrapper = styled.div`
  font-size: 62.5%;
`;

function App() {
  return (
    <>
      <StyleWrapper />
      <Header />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  );
}

export default App;
