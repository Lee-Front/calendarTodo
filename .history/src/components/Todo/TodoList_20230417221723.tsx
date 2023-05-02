import React from "react";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}
interface TodoProps {
  todos: string[];
}

const TodoList = ({ todos }: TodoProps) => {
  return <div>{todos}</div>;
};

export default TodoList;
