import React from "react";
import styled from "@emotion/styled";
import Plus from "../../images/plus.svg";
import Calendar from "../../images/calendar.svg";
import { useNavigate } from "react-router-dom";
import { TodoMenuProps } from "types/todoTypes";

const TodoMenu = ({ addTodo, selectDate }: TodoMenuProps) => {
  const nav = useNavigate();
  return (
    <MenuContainer>
      <MenuButton
        onClick={() => {
          addTodo();
        }}
      >
        <img src={Plus} />
      </MenuButton>
      <span>{selectDate}</span>
      <MenuButton
        onClick={() => {
          nav("/", {
            state: { direction: "right", date: { year: 2023, month: 4 } },
          });
        }}
      >
        <img src={Calendar} />
      </MenuButton>
    </MenuContainer>
  );
};

export default TodoMenu;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  padding: 1rem;
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

const MenuButton = styled.div`
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
  }
`;
