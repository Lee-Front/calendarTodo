import React from "react";
interface Todo {
  id?: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoItemProps {
  todo: Todo;
}
const TodoItem = ({ todo }: TodoItemProps) => {
  console.log("todo : ", todo);
  return <div></div>;
};

export default TodoItem;
