import React, { useState } from "react";
import TodoList from "../components/Todo/TodoList";
import TodoMenu from "../components/Todo/TodoMenu";

interface Todo {
  text: string | undefined;
  checked: boolean;
}

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <TodoMenu />
      <TodoList todos={todos} />
    </>
  );
};

export default TodoPage;

//const TodoWrapper = styled.div``;
