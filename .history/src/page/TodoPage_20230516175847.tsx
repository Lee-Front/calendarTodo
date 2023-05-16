import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import TodoList from "../components/todo/TodoList";
import TodoMenu from "../components/todo/TodoMenu";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import useDateStore from "../stores/useDateStore";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

const TodoPage = () => {
  const location = useLocation();
  const { year, month, day } = location.state.date;
  const initialDate = new Date(year, month - 1, day);
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    const response = await axios.get("/posts", {
      params: { searchDate: currentDate },
    });
    setTodos(response.data);
  };

  const addTodo = () => {
    axios
      .post("/post", {
        date: currentDate,
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
    <TodoPageContainer>
      <TodoMenu addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </TodoPageContainer>
  );
};

const TodoPageContainer = styled.div`
  position: absolute;
  width: 100%;
`;

export default TodoPage;
