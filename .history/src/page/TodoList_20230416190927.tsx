import React, { useState } from "react";
import styled from "@emotion/styled";

const TodoWrapper = styled.div``;
const MenuWrapper = styled.div``;
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  return (
    <TodoWrapper>
      <MenuWrapper>메뉴 목록</MenuWrapper>;
    </TodoWrapper>
  );
};

export default TodoList;
