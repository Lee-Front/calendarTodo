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
        <LeftMenu>
          <div>추가</div>
        </LeftMenu>
        <RightMenu>
          <div>달력</div>
          <div>공유</div>
        </RightMenu>
      </MenuWrapper>
      <TodoWrapper>투두목록</TodoWrapper>
    </>
  );
};

export default TodoList;

const MenuWrapper = styled.div`
  display: flex;
  font-size: 2rem;
  margin-top: 0.5rem;
  background: gray;
`;

const LeftMenu = styled.div``;
const RightMenu = styled.div``;
const TodoWrapper = styled.div``;
