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

  const addTodo = async () => {
    try {
      const test = await axios.post("/post", "");
      console.log("test : ", test);
    } catch (error) {
      console.log("err : ", error);
    }
  };

  const updateTodo = (todo: Todo) => {
    // 서버 업데이트를 먼저하고 성공하면 state를 변경하는게 맞지 않나?

    const newTodos = todos.map((v) => {
      if (v.id === todo.id) return todo;
      return v;
    });
    // 서버 업데이트도
    setTodos(newTodos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TodoMenu addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} />
    </>
  );
};

export default TodoPage;

//const TodoWrapper = styled.div``;