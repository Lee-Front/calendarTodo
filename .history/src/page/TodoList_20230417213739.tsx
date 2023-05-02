import React, { useState } from "react";
import styled from "@emotion/styled";
import Plus from "../images/plus.svg";
import Share from "../images/share.svg";
import Calendar from "../images/calendar.svg";

interface Todo {
  text: string | undefined;
  checked: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <MenuContainer>
        <MenuButton>
          <img src={Plus} />
        </MenuButton>
        <MenuGroup>
          <MenuButton>
            <img src={Calendar} />
          </MenuButton>
          <MenuButton>
            <img src={Share} />
          </MenuButton>
        </MenuGroup>
      </MenuContainer>
      <TodoWrapper>투두목록</TodoWrapper>
    </>
  );
};

export default TodoList;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background: gray;
`;

const MenuGroup = styled.div`
  display: flex;
`;

const MenuButton = styled.div`
  img {
    height: 3rem;
    width: 3rem;
  }
`;

const TodoWrapper = styled.div``;
