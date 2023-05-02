import React, { useState } from "react";
import styled from "@emotion/styled";

const TodoWrapper = styled.div``;
const MenuWrapper = styled.div``;

interface Todo {
  text: string | undefined;
  checked: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div>
      <MenuWrapper>
        <div>추가</div>
        <div>달력</div>
        <div>공유</div>
      </MenuWrapper>
      <TodoWrapper>투두목록</TodoWrapper>
    </div>
  );
};

export default TodoList;
