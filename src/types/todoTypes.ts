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

export interface TodoMenuProps {
  addTodo: () => void;
}

export interface TodoCheckProps {
  isChecked: boolean;
  onClick?: () => void;
}
