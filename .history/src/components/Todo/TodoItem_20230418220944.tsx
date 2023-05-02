import React, { useState } from "react";
interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}
const TodoItem = ({ todo, updateTodo }: TodoItemProps) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.check}
        onChange={() => {
          updateTodo(todo);
        }}
      />
      {todo.text}
    </div>
  );
};

export default TodoItem;
