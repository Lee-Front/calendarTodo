import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoList from "./page/TodoList";

const App = () => (
  <Routes>
    <Route path="" element={<TodoList />} />
  </Routes>
);

export default App;
