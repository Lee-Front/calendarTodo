import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import Pen from "../../images/pen.svg";
import Trash from "../../images/trash.svg";
import Xmark from "../../images/xmark.svg";
import Check from "../../images/check.svg";
import CheckBox from "../../images/checkBox.svg";
import CheckedBox from "../../images/checkedBox.svg";

import { Todo, TodoCheckProps, TodoItemProps } from "../../types/todoTypes";

const TodoItem = ({ todo, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [data, setData] = useState<Todo>(todo);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <TodoItemContainer>
      <TodoCheckBox
        isChecked={data.check}
        onClick={() => {
          const newTodo: Todo = {
            ...data,
            check: !data.check,
          };
          setData(newTodo);
          updateTodo(newTodo);
        }}
      />
      <TodoContentWrapper
        onClick={() => {
          const newTodo: Todo = {
            ...data,
            check: !data.check,
          };
          setData(newTodo);
          updateTodo(newTodo);
        }}
      >
        <InputAnimation isEditing={isEditing}></InputAnimation>
        {isEditing ? (
          <TodoInput
            ref={inputRef}
            defaultValue={data.text}
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></TodoInput>
        ) : (
          <TodoSpan>{data.text}</TodoSpan>
        )}
      </TodoContentWrapper>
      <TodoActionsContainer>
        <TodoActionWrapper isFold={isEditing}>
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
                deleteTodo(data.id);
              }}
            />
          </TodoActionButton>
        </TodoActionWrapper>

        <TodoActionWrapper isFold={!isEditing}>
          <TodoActionButton>
            <TodoActionImg
              src={Check}
              onClick={() => {
                if (inputRef.current) {
                  const newTodo: Todo = {
                    ...data,
                    text: inputRef.current.value,
                  };
                  updateTodo(newTodo);
                  setData(newTodo);
                }

                setIsEditing((prev) => !prev);
              }}
            />
          </TodoActionButton>
          <TodoActionButton>
            <TodoActionImg
              src={Xmark}
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
            />
          </TodoActionButton>
        </TodoActionWrapper>
      </TodoActionsContainer>
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 4rem;
  background: #ffea92;
  :after {
    content: "";
    position: absolute;
    border-bottom: 0.1rem solid #4c4c4c;
    bottom: 0;
    left: 1.5rem;
    right: 1.5rem;
  }
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

const TodoCheckBox = styled.div<TodoCheckProps>`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-image: url(${(props) => (props.isChecked ? CheckedBox : CheckBox)});
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

const TodoActionsContainer = styled.div`
  display: flex;
  width: 6rem;
`;

const TodoActionWrapper = styled.div<{ isFold: boolean }>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.isFold ? 0 : 100)}%;
  height: 100%;
  gap: 1rem;
  overflow: hidden;
  transition: ease 0.3s;
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
