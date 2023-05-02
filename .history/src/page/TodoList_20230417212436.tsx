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
        <div>추가</div>
        <div>달력</div>
        <div>공유</div>
      </MenuWrapper>
      <TodoWrapper>투두목록</TodoWrapper>
    </>
  );
};

export default TodoList;

const MenuWrapper = styled.div`
  margin-top: 0.5rem;
  background: gray;
`;
const TodoWrapper = styled.div``;
