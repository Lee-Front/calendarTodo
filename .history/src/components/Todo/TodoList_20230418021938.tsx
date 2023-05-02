import React from "react";
import styled from "@emotion/styled";
import TodoItem from "./TodoItem";

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
  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div``;
