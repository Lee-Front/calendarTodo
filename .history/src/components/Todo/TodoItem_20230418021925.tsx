import React from "react";
interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}
const TodoItem = ({ todo }: Todo) => {
  return <div></div>;
};

export default TodoItem;
