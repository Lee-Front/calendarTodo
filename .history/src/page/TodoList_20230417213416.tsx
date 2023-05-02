import React, { useState } from "react";
import styled from "@emotion/styled";

interface Todo {
  text: string | undefined;
  checked: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <MenuContainer>
        <MenuGroup>
          <div>추가</div>
        </MenuGroup>
        <MenuGroup>
          <div>달력</div>
          <div>공유</div>
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
const TodoWrapper = styled.div``;
