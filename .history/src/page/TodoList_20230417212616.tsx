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
      <MenuWrapper>
        <Menu>
          <div>추가</div>
        </Menu>
        <Menu>
          <div>달력</div>
          <div>공유</div>
        </Menu>
      </MenuWrapper>
      <TodoWrapper>투두목록</TodoWrapper>
    </>
  );
};

export default TodoList;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-top: 0.5rem;
  background: gray;
`;

const Menu = styled.div`
  display: flex;
`;
const TodoWrapper = styled.div``;
