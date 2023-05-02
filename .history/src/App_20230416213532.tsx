import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./page/Calendar";
import TodoList from "./page/TodoList";
import Header from "./common/Header";
import { Global } from "@emotion/react";

function App() {
  return (
    <>
      <Global styles={{ fontSize: "20px" }} />
      <Header />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
  );
}

export default App;
