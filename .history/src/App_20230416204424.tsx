import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Calendar from "./page/Calendar";
import TodoList from "./page/TodoList";
import Header from "./common/Header";

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  </>
);

export default App;