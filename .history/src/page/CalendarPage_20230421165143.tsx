import React from "react";
import TodoList from "../components/Todo/TodoList";
import TodoMenu from "../components/Todo/TodoMenu";

const CalendarPage = () => {
  return;
  <>
    <>
      <TodoMenu />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </>
  </>;
};

export default CalendarPage;
