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
    <TodoItemContainer>
      <TodoInput
        type="checkbox"
        checked={todo.check}
        onChange={() => {
          const newTodo = { ...todo, check: !todo.check };
          updateTodo(newTodo);
        }}
      />
      <TodoText>{todo.text}</TodoText>
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  height: 4rem;
`;

const TodoInput = styled.input`
  width: 2rem;
  height: 2rem;
`;

const TodoText = styled.div`
  margin-left: 0.5rem;
  background: red;
  height: 100%;
  font-size: 2rem;
  line-height: 1rem;
  flex: 1;
`;
