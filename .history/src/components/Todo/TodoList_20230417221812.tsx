import React from "react";
import styled from "@emotion/styled";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoProps) => {
  return <TodoListContainer>투두목록</TodoListContainer>;
};

export default TodoList;

const TodoListContainer = styled.div``;
