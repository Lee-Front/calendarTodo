import React from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "./page/Calendar";
import TodoList from "./page/TodoList";

const App = () => (
  <Routes>
    <Route path="/" element={<TodoList />} />
    <Route path="/calendar" element={<Calendar />} />
  </Routes>
);

export default App;
