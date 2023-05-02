import React from "react";
import styled from "@emotion/styled";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

interface TodoProps {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
}

const TodoList = ({ todos, updateTodo }: TodoProps) => {
  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  background: #ffdea2;
`;
