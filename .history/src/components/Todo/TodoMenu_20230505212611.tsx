import React from "react";
import styled from "@emotion/styled";
import Plus from "../../../public/images/plus.svg";
import Share from "../../../public/images/share.svg";
import Calendar from "../../public/images/calendar.svg";
import { useNavigate } from "react-router-dom";

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
            nav("/", {
              state: { direction: "right", date: { year: 2023, month: 4 } },
            });
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
