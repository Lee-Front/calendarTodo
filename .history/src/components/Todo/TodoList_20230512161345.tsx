import React from "react";
import styled from "@emotion/styled";
import TodoItem from "../todo/TodoItem";
import { TodoProps } from "../../types/todoTypes";

const TodoList = ({ todos, updateTodo, deleteTodo }: TodoProps) => {
  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  flex: 1;
`;
