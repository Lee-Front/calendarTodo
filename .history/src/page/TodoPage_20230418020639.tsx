import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoList from "../components/Todo/TodoList";
import TodoMenu from "../components/Todo/TodoMenu";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

const TodoPage = async () => {
  useEffect(() => {
    const res = await axios.get("/posts");
    console.log("res : ", res);
  }, []);
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
