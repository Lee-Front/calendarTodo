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

  const addTodo = () => {
    axios.post("/post", "").then((res) => {
      const data = res.data;
      setTodos([...todos, data]);
    });
  };

  const updateTodo = (todo: Todo) => {
    axios.put("/post", todo).then((res) => {
      const newTodos = todos.map((v) => {
        if (v.id === todo.id) return todo;
        return v;
      });

      setTodos(newTodos);
    });
  };

  const deleteTodo = (id: number) => {
    axios.delete("/post", { data: { id } }).then(() => {
      try {
        const newTodos = todos.filter((v) => v.id !== id);
        setTodos(newTodos);
      } catch (e) {
        console.log("delete err");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TodoMenu addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </>
  );
};

export default TodoPage;

//const TodoWrapper = styled.div``;
