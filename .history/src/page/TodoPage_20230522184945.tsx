import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoList from "../components/todo/TodoList";
import TodoMenu from "../components/todo/TodoMenu";
import styled from "@emotion/styled";

import useAuthStore from "../stores/useAuthStore";
import { Todo } from "../types/todoTypes";
import { useLocation } from "react-router-dom";

const TodoPage = () => {
  const location = useLocation();
  const { year, month, day } = location.state.date;
  const userId = useAuthStore((state) => state.userId);
  const selectDate = new Date(year, month - 1, day);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    const response = await axios.get("/post", {
      params: { searchDate: selectDate, userId },
    });
    console.log("response.data: ", response.data);
    setTodos(response.data);
  };

  const addTodo = () => {
    axios
      .post("/post", {
        date: selectDate,
        userId,
      })
      .then((res) => {
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
      const newTodos = todos.filter((v) => v.id !== id);
      setTodos(newTodos);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TodoPageContainer {...location.state.postColor}>
      <TodoMenu addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </TodoPageContainer>
  );
};

const TodoPageContainer = styled.div<{ r: number; g: number; b: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => `rgb(${props.r},${props.g},${props.b})`};
`;

export default TodoPage;
