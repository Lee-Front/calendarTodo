import React, { useState } from "react";
import styled from "@emotion/styled";
import Pen from "../../images/pen.svg";
import Trash from "../../images/trash.svg";

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
  const [isEditing, setIsEditing] = useState(false);
  return (
    <TodoItemContainer
      onClick={() => {
        const newTodo = { ...todo, check: !todo.check };
        updateTodo(newTodo);
      }}
    >
      <TodoInput type="checkbox" checked={todo.check} readOnly />
      <TodoWrapper>
        {isEditing ? (
          <TodoSpan>{todo.text}</TodoSpan>
        ) : (
          <TodoSpan>{todo.text}</TodoSpan>
        )}
      </TodoWrapper>
      <TodoActionWrapper>
        <TodoActionButton>
          <TodoActionImg src={Pen} />
        </TodoActionButton>
        <TodoActionButton>
          <TodoActionImg src={Trash} />
        </TodoActionButton>
      </TodoActionWrapper>
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 4rem;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

const TodoInput = styled.input`
  width: 2rem;
  height: 2rem;
  pointer-events: none;
`;

const TodoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  height: 100%;
  flex: 1;
`;

const TodoSpan = styled.span`
  font-size: 2rem;
`;

const TodoActionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 1rem;
`;

const TodoActionButton = styled.button`
  background: none;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
`;

const TodoActionImg = styled.img`
  width: 100%;
  height: 100%;
`;
