import axios, { AxiosResponse } from "axios";
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
    const response: AxiosResponse = await axios("/posts");
    setTodos(response.data);
  };

  const changeCheck = (id: number) => {
    console.log("id : ", id);
    const index: number = todos.findIndex((todo) => todo.id === id);
    const target: Todo = todos[index];
    target.check = !target.check;
    setTodos((prev) => [...prev, target]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TodoMenu />
      <TodoList todos={todos} changeCheck={changeCheck} />
    </>
  );
};

export default TodoPage;

//const TodoWrapper = styled.div``;
