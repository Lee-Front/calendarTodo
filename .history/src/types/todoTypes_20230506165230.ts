export interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

export interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}

export interface TodoProps {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}
