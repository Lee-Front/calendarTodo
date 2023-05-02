import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Pen from "../../images/pen.svg";
import Trash from "../../images/trash.svg";

import Ban from "../../images/ban.svg";
import Xmark from "../../images/xmark.svg";
import Check from "../../images/check.svg";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}
const TodoItem = ({ todo, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <TodoItemContainer>
      <TodoCheckBox
        type="checkbox"
        checked={todo.check}
        readOnly
        onClick={() => {
          const newTodo: Todo = {
            ...todo,
            check: !todo.check,
          };
          updateTodo(newTodo);
        }}
      />
      <TodoContentWrapper
        onClick={() => {
          const newTodo: Todo = {
            ...todo,
            check: !todo.check,
          };
          updateTodo(newTodo);
        }}
      >
        <InputAnimation isEditing={isEditing}></InputAnimation>
        {isEditing ? (
          <TodoInput
            defaultValue={todo.text}
            onChange={(e) => {
              console.log("e : ", e);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></TodoInput>
        ) : (
          <TodoSpan>{todo.text}</TodoSpan>
        )}
      </TodoContentWrapper>
      <TodoActionWrapper>
        <TodoActionButton>
          <TodoActionImg
            src={Pen}
            onClick={() => {
              setIsEditing((prev) => !prev);
            }}
          />
        </TodoActionButton>
        <TodoActionButton>
          <TodoActionImg
            src={Trash}
            onClick={() => {
              deleteTodo(todo.id);
            }}
          />
        </TodoActionButton>
      </TodoActionWrapper>

      <TodoActionWrapper>
        <TodoActionButton>
          <TodoActionImg
            src={Check}
            onClick={() => {
              //deleteTodo(todo.id);
            }}
          />
        </TodoActionButton>
        <TodoActionButton>
          <TodoActionImg
            src={Xmark}
            onClick={() => {
              deleteTodo(todo.id);
            }}
          />
        </TodoActionButton>
      </TodoActionWrapper>
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 4rem;
  border-bottom: 1px solid black;
  box-sizing: border-box;
`;

const TodoContentWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  height: 100%;
  flex: 1;
  cursor: pointer;
  gap: 0.5rem;
`;

const TodoCheckBox = styled.input`
  width: 2rem;
  height: 2rem;
`;

const TodoSpan = styled.span`
  font-size: 2rem;
  width: 100%;
  z-index: 1;
  border-radius: 0.3rem;
`;

const TodoInput = styled.input`
  font-size: 2rem;
  width: 100%;
  height: 100%;
  background: none;
  z-index: 1;
  outline: none;
`;

const InputAnimation = styled.div<{ isEditing: boolean }>`
  width: ${(props) => (props.isEditing ? 100 : 0)}%;
  height: 85%;
  position: absolute;
  border-radius: 0.3rem;
  background: rgb(255, 255, 255);
  transition: ease 0.3s;
  pointer-events: none;
`;

const TodoActionWrapper = styled.div<{ isFold: boolean }>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.isFold ? 0 : 100)}%;
  height: 100%;
  gap: 1rem;
  overflow: hidden;
`;

const TodoActionButton = styled.button`
  background: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
`;

const TodoActionImg = styled.img`
  width: 100%;
  height: 100%;
`;
