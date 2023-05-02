import React from "react";
import styled from "@emotion/styled";
import Plus from "../../images/plus.svg";
import Share from "../../images/share.svg";
import Calendar from "../../images/calendar.svg";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoMenuProps {
  addTodo: () => void;
}

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
            nav("/calendar", { state: { direction: "left" } });
          }}
        >
          <img src={Calendar} />
        </MenuButton>
        <MenuButton>
          <img src={Share} />
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
  background: #ffc965;
  border-bottom: 0.2rem solid white;
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
