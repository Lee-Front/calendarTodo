import React from "react";
import TodoList from "../components/Todo/TodoList";
import TodoMenu from "../components/Todo/TodoMenu";
import styled from "@emotion/styled";

const CalendarPage = () => {
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
            nav("/calendar");
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

export default CalendarPage;

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
