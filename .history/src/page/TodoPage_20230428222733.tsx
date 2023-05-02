import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import TodoList from "../components/Todo/TodoList";
import TodoMenu from "../components/Todo/TodoMenu";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

interface DateInfo {
  year: number;
  month: number;
  day?: number;
}

const TodoPage = () => {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(
      `${location.state.date.year}-${location.state.date.year}-${location.state.date.year}`
    )
  );
  // const [currentDate, setCurrentDate] = useState<DateInfo>({
  //   year: location.state.date.year,
  //   month: location.state.date.month,
  //   day: location.state.date.day,
  // });
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    const params = {
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
    };

    const response = await axios.get("/posts", {
      params,
    });
    setTodos(response.data);
  };

  const addTodo = () => {
    axios
      .post("/post", {
        date: new Date(
          `${currentDate.year}-${currentDate.month}-${currentDate.day}`
        ),
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
