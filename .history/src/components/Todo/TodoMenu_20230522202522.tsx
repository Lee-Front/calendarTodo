import React from "react";
import styled from "@emotion/styled";
import Plus from "../../images/plus.svg";
import Calendar from "../../images/calendar.svg";
import { useNavigate } from "react-router-dom";
import { TodoMenuProps } from "types/todoTypes";

const TodoMenu = ({ addTodo }: TodoMenuProps) => {
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
      <MenuGroup>
        <MenuButton
          onClick={() => {
            nav("/", {
              state: { direction: "right", date: { year: 2023, month: 4 } },
            });
          }}
        >
          <img src={Calendar} />
        </MenuButton>
      </MenuGroup>
    </MenuContainer>
  );
};

export default TodoMenu;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  padding: 1rem;
  background: #ffea92;
  border-bottom: 0.2rem solid #4c4c4c;
`;

const MenuGroup = styled.div`
  display: flex;
  gap: 1.5rem;
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
