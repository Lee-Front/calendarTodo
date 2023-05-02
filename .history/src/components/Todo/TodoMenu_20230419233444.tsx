import React from "react";
import styled from "@emotion/styled";
import Plus from "../../images/plus.svg";
import Share from "../../images/share.svg";
import Calendar from "../../images/calendar.svg";
import axios from "axios";

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
        <MenuButton>
          <img src={Calendar} />
        </MenuButton>
        <MenuButton
          onClick={() => {
            axios.get("/posts").then((data) => {
              console.log("data ; ", data);
            });
          }}
        >
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
  margin-top: 0.5rem;
  padding: 1rem;
  background: gray;
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
