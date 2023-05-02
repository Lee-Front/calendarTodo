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

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    await axios("/posts").then((data) => {
      console.log("data : ", data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TodoMenu />
      <TodoList todos={todos} />
    </>
  );
};

export default TodoPage;

//const TodoWrapper = styled.div``;