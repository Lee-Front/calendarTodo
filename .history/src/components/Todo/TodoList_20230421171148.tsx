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
  deleteTodo: (id: number) => void;
}

const TodoList = ({ todos, updateTodo, deleteTodo }: TodoProps) => {
  return (
    <></>
    // <TodoListContainer>
    //   {todos.map((todo) => (
    //     <TodoItem
    //       key={todo.id}
    //       todo={todo}
    //       updateTodo={updateTodo}
    //       deleteTodo={deleteTodo}
    //     />
    //   ))}
    // </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  flex: 1;
`;
