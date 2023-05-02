import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
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
  const [animation, setAnimation] = useState(false);

  const updateEditing = () => {
    if (!isEditing) {
      setIsEditing((prev) => !prev);
    }
    setAnimation((prev) => !prev);
  };

  return (
    <TodoItemContainer>
      <TodoContentWrapper
        onClick={() => {
          const newTodo: Todo = {
            ...todo,
            check: !todo.check,
          };
          updateTodo(newTodo);
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
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
          <TodoSpan>{todo.text}</TodoSpan>
        </div>
        <TodoInput
          defaultValue={todo.text}
          animation={animation}
          onAnimationEnd={() => {
            if (!animation) {
              setIsEditing((prev) => !prev);
            }
          }}
          onChange={(e) => {
            console.log("e : ", e);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></TodoInput>
      </TodoContentWrapper>
      <TodoActionWrapper>
        <TodoActionButton>
          <TodoActionImg
            src={Pen}
            onClick={() => {
              updateEditing();
            }}
          />
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

  background-color: blue;
  transform: rotate(45deg);
  transform-origin: top left;
`;

const TodoCheckBox = styled.input`
  width: 2rem;
  height: 2rem;
`;

const TodoSpan = styled.span`
  font-size: 2rem;
  width: 100%;
  border-radius: 0.3rem;
`;

const expandWidth = keyframes`
  from {
    width: 0;
    }
    to {
      width: 100%;
    }
`;

const collapseWidth = keyframes`
  from {
    width: 100%
  }
  to {
    width: 0;
  }
`;

const TodoInput = styled.input<{ animation: boolean }>`
  font-size: 2rem;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  animation-name: ${(props) => (props.animation ? expandWidth : collapseWidth)};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  z-index: 1;
  outline: none;
`;

const InputAnimation = styled.div`
  width: 0;
  height: 85%;
  position: absolute;
  border-radius: 0.3rem;
  pointer-events: none;
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
  width: 2rem;
  height: 2rem;
`;

const TodoActionImg = styled.img`
  width: 100%;
  height: 100%;
`;
