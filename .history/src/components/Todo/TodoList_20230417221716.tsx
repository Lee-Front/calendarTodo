import React from "react";

interface Todo {
  id: number;
  text: string;
  check: boolean;
}
interface TodoProps {
  todos: string[];
}

const TodoList = ({ todos }: TodoProps) => {
  return <div>{todos}</div>;
};

export default TodoList;
