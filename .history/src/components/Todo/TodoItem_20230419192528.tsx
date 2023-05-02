import React, { useState } from "react";
import styled from "@emotion/styled";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}
const TodoItem = ({ todo, updateTodo }: TodoItemProps) => {
  return (
    <TodoItemWrapper>
      <TodoInput
        type="checkbox"
        checked={todo.check}
        onChange={() => {
          const newTodo = { ...todo, check: !todo.check };
          updateTodo(newTodo);
        }}
      />
      {todo.text}
    </TodoItemWrapper>
  );
};

export default TodoItem;

const TodoItemWrapper = styled.div``;

const TodoInput = styled.input`
  width: 2rem;
  height: 2rem;
`;
