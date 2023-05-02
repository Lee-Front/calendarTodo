import React, { useState } from "react";
interface Todo {
  id?: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoItemProps {
  todo: Todo;
  changeCheck: (event: React.MouseEvent<HTMLInputElement>) => void;
}
const TodoItem = ({ todo, changeCheck }: TodoItemProps) => {
  return (
    <div>
      <input type="checkbox" checked={todo.check} onChange={changeCheck} />
      {todo.text}
    </div>
  );
};

export default TodoItem;
