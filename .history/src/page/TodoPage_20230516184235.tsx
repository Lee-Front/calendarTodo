import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoList from "../components/todo/TodoList";
import TodoMenu from "../components/todo/TodoMenu";
import styled from "@emotion/styled";
import useDateStore from "../stores/useDateStore";
import useAuthStore from "../stores/useAuthStore";
import { Todo } from "../types/todoTypes";

const TodoPage = () => {
  const { selectDate } = useDateStore();
  const { userId } = useAuthStore();
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    console.log("selectDate: ", selectDate);
    console.log("userId: ", userId);
    const response = await axios.get("/post", {
      params: { searchDate: selectDate, userId },
    });
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
