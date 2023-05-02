import React, { useState } from "react";
interface Todo {
  id?: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoItemProps {
  todo: Todo;
  changeCheck: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div>
      <input type="checkbox" checked={todo.check} onClick={changeCheck} />
      {todo.text}
    </div>
  );
};

export default TodoItem;
