import React, { useState } from "react";
import TodoMenu from "../components/Todo/TodoMenu";

interface Todo {
  text: string | undefined;
  checked: boolean;
}

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <TodoMenu />
      <div>투두목록</div>
    </>
  );
};

export default TodoPage;

//const TodoWrapper = styled.div``;
