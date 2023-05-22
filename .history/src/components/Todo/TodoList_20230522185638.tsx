import React from "react";
import styled from "@emotion/styled";
import TodoItem from "../todo/TodoItem";
import { TodoProps } from "../../types/todoTypes";

const TodoList = ({ todos, updateTodo, deleteTodo, rgbColor }: TodoProps) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  flex: 1;
`;
