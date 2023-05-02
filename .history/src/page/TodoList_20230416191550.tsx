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
    <TodoWrapper>
      <MenuWrapper>메뉴 목록</MenuWrapper>
    </TodoWrapper>
  );
};

export default TodoList;
