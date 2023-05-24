import { CookieSerializeOptions } from "cookie";

export const DBName = "todos_db";
export const todoStoreName = "todos_store";
export const userStoreName = "user_store";
export const styleStoreName = "style_store";
export const JWT_ACCESS_TEXT = "calendar-todo-secret-lee-dawn-access-token-1154";
export const JWT_REFRESH_TEXT = "calendar-todo-secret-lee-dawn-refresh-token-3390";

export const encoder = new TextEncoder();
export const accessKey = encoder.encode(JWT_ACCESS_TEXT);
export const refreshKey = encoder.encode(JWT_REFRESH_TEXT);
export const accessExp = "1m";
export const refreshExp = "2h";

export const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 2,
  sameSite: "strict",
};
