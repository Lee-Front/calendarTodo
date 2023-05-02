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
  changeCheck: (id: number) => void;
}

const TodoList = ({ todos, changeCheck }: TodoProps) => {
  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} changeCheck={changeCheck} />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div``;
