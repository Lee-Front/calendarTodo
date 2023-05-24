import { CookieSerializeOptions } from "cookie";

const DBName = "todos_db";
const todoStoreName = "todos_store";
const userStoreName = "user_store";
const styleStoreName = "style_store";
export const databaseConfig = {
  DBName,
  todoStoreName,
  userStoreName,
  styleStoreName,
};

export const JWT_ACCESS_TEXT = "calendar-todo-secret-lee-dawn-access-token-1154";
export const JWT_REFRESH_TEXT = "calendar-todo-secret-lee-dawn-refresh-token-3390";

const encoder = new TextEncoder();
const accessKey = encoder.encode(JWT_ACCESS_TEXT);
const refreshKey = encoder.encode(JWT_REFRESH_TEXT);
const accessExp = "1m";
const refreshExp = "2h";

const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 2,
  sameSite: "strict",
};

export const cookieConfig = {
  cookieOptions,
  accessKey,
  refreshKey,
  accessExp,
  refreshExp,
};
