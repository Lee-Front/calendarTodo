import { rgbColor } from "./commonTypes";

export interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
  userId: string;
  date: Date;
}

export interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  postItColor: rgbColor;
}

export interface TodoMenuProps {
  addTodo: () => void;
  postItColor: rgbColor;
}

export interface TodoCheckProps {
  isChecked: boolean;
  onClick?: () => void;
}
