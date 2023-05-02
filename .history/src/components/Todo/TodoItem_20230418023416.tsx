import React, { useState } from "react";
interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoItemProps {
  todo: Todo;
  changeCheck: (id: number) => void;
}
const TodoItem = ({ todo, changeCheck }: TodoItemProps) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.check}
        onChange={() => {
          changeCheck(todo.id);
        }}
      />
      {todo.text}
    </div>
  );
};

export default TodoItem;
