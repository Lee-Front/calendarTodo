import { rest } from "msw";
import { SignJWT, jwtVerify, JWTVerifyResult } from "jose";
import CryptoJS from "crypto-js";
import { serialize } from "cookie";
import Cookies from "js-cookie";

import { User } from "../types/authTypes";
import { Todo } from "../types/todoTypes";
import { Error } from "../types/commonTypes";
import { SearchCalendarResult } from "../types/calendarTypes";

import { cookieConfig, databaseConfig } from "./config";

const getCookie = (name: string): string => {
  return Cookies.get(name)?.split("=")[1]?.split(";")[0] ?? "";
};

const createJwt = async (userId: string, tokenExp: string, key: Uint8Array): Promise<string> => {
  return new SignJWT({ userId, "urn:calendarTodo:claim": true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("calendar-todo-app")
    .setAudience("https://lee-front.github.io")
    .setExpirationTime(tokenExp)
    .sign(key);
};

const validateToken = async (): Promise<boolean> => {
  const token: string = Cookies.get("accessToken")?.split("=")[1]?.split(";")[0] || "";

  try {
    const jwt: JWTVerifyResult = await jwtVerify(token, cookieConfig.accessKey, {
      issuer: "calendar-todo-app",
      audience: "https://lee-front.github.io",
      algorithms: ["HS256"],
    });

    const exp: number | undefined = jwt.payload?.exp;

    if (exp) {
      const now: number = new Date().getTime() / 1000;
      if (now > exp) {
        return false;
      }
    }
    return true;
  } catch (e) {
    return false;
  }
};

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open(databaseConfig.DBName, 2);

    request.onerror = () => {
      console.error("db open err");
      reject();
    };

    request.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const todoStore: IDBObjectStore = db.createObjectStore(databaseConfig.todoStoreName, {
        keyPath: "id",
        autoIncrement: true,
      });
      todoStore.createIndex("sort", ["userId", "date"], { unique: false });
      todoStore.createIndex("date", ["userId", "date"], { unique: false });
      const userStore: IDBObjectStore = db.createObjectStore(databaseConfig.userStoreName, {
        keyPath: "id",
        autoIncrement: true,
      });
      userStore.createIndex("userId", "userId", { unique: true });
      const styleStore: IDBObjectStore = db.createObjectStore(databaseConfig.styleStoreName, {
        keyPath: "id",
        autoIncrement: true,
      });
      styleStore.createIndex("composite", ["userId", "date"], { unique: true });
    };

    request.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
  });
};

const addTodo = (date: string, userId: string): Promise<IDBValidKey> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db: IDBDatabase = await openDatabase();
      const tx: IDBTransaction = db.transaction(databaseConfig.todoStoreName, "readwrite");
      const store: IDBObjectStore = tx.objectStore(databaseConfig.todoStoreName);
      const createDate: Date = new Date(date);
      store.index("sort").openCursor([userId, createDate], "prev").onsuccess = async (event) => {
        const cursor = await (event.target as IDBRequest).result;
        const maxSort: number = cursor?.value?.sort ?? 0;

        const newTodo: Omit<Todo, "id"> = {
          text: "",
          check: false,
          sort: maxSort + 1,
          userId,
          date: createDate,
        };

        store.add(newTodo).onsuccess = async (addEvent) => {
          const addResult = await (addEvent.target as IDBRequest).result;
          store.get(addResult).onsuccess = async (getEvent) => {
            const todoResult = await (getEvent.target as IDBRequest).result;
            resolve(todoResult);
          };
        };
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const deleteTodo = (id: number, userId: string, dateStr: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db: IDBDatabase = await openDatabase();
      const tx: IDBTransaction = db.transaction(databaseConfig.todoStoreName, "readwrite");
      const store: IDBObjectStore = tx.objectStore(databaseConfig.todoStoreName);

      store.delete(id).onsuccess = () => {
        const date: Date = new Date(dateStr);
        store.index("date").count([userId, date]).onsuccess = (countEvent) => {
          const count = (countEvent.target as IDBRequest).result;

          if (count === 0) {
            const styleStore: IDBObjectStore = db
              .transaction(databaseConfig.styleStoreName, "readwrite")
              .objectStore(databaseConfig.styleStoreName);
            styleStore.index("composite").get([userId, date]).onsuccess = (event) => {
              const result = (event.target as IDBRequest).result;
              if (result) {
                console.log(result);
                styleStore.delete(result.id);
              }
            };
          }
        };
        resolve();
      };
    } catch (err) {
      console.error("Todo Delete Error : ", err);
      reject();
    }
  });
};

const updateTodo = (todo: Todo): Promise<IDBValidKey> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db: IDBDatabase = await openDatabase();
      const tx: IDBTransaction = db.transaction(databaseConfig.todoStoreName, "readwrite");
      const store: IDBObjectStore = tx.objectStore(databaseConfig.todoStoreName);
      store.get(todo.id).onsuccess = async (event) => {
        const result = (event.target as IDBRequest).result;
        if (result) {
          todo.date = new Date(todo.date);
          store.put(todo);
          resolve(result);
        } else {
          reject();
        }
      };
    } catch (err) {
      console.error("Todo Update Error : ", err);
      reject();
    }
  });
};

const searchTodos = (date: string, userId: string): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db: IDBDatabase = await openDatabase();
      const tx: IDBTransaction = db.transaction(databaseConfig.todoStoreName, "readonly");
      const store: IDBObjectStore = tx.objectStore(databaseConfig.todoStoreName);

      const searchDate: Date = new Date(date);

      store.index("date").getAll([userId, searchDate]).onsuccess = (event) => {
        const result = (event.target as IDBRequest<Todo[]>).result;
        resolve(result);
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const addPostItStyle = (
  date: string,
  userId: string,
  color: { r: number; g: number; b: number }
): Promise<IDBValidKey> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db: IDBDatabase = await openDatabase();
      const tx: IDBTransaction = db.transaction(databaseConfig.styleStoreName, "readwrite");
      const store: IDBObjectStore = tx.objectStore(databaseConfig.styleStoreName);

      const createDate: Date = new Date(date);
      store.index("composite").get([userId, createDate]).onsuccess = async (event) => {
        const cursor = await (event.target as IDBRequest).result;

        if (cursor) {
          cursor.color = color;
          store.put(cursor);
        } else {
          const newStyle = {
            userId,
            date: createDate,
            color,
          };
          store.add(newStyle);
        }
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const searchCalendar = (startDate: string, endDate: string, userId: string): Promise<SearchCalendarResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db: IDBDatabase = await openDatabase();
      const tx: IDBTransaction = db.transaction(databaseConfig.todoStoreName, "readonly");
      const store: IDBObjectStore = tx.objectStore(databaseConfig.todoStoreName);
      const range: IDBKeyRange = IDBKeyRange.bound([userId, new Date(startDate)], [userId, new Date(endDate)]);

      const todosByDate: { [key: string]: Todo[] } = {};
      store.index("date").openCursor(range).onsuccess = async (event) => {
        const result = await (event.target as IDBRequest).result;

        if (result) {
          const todoData = result.value;
          const date: Date = new Date(todoData.date);
          const dateStr: string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

          if (!todosByDate[dateStr]) {
            todosByDate[dateStr] = [];
          }
          todosByDate[dateStr].push(result.value);

          result.continue();
        } else {
          const dates: string[] = Object.keys(todosByDate);
          const styleTx: IDBTransaction = db.transaction(databaseConfig.styleStoreName, "readonly");
          const styleStore: IDBObjectStore = styleTx.objectStore(databaseConfig.styleStoreName);

          const monthTodosInfo: {
            [key: string]: { total: number; completed: number; color?: { r: number; g: number; b: number } };
          } = {};
          const requests = dates.map((item) => {
            const completedTodos: number = todosByDate[item].filter((v: Todo) => v.check).length;
            const createDate: Date = new Date(item);
            monthTodosInfo[item] = {
              total: todosByDate[item].length,
              completed: completedTodos,
            };
            return new Promise((resolve) => {
              styleStore.index("composite").get([userId, createDate]).onsuccess = async (event) => {
                const styleCursor = await (event.target as IDBRequest).result;
                monthTodosInfo[item].color = styleCursor?.color;
                resolve(styleCursor?.color);
              };
            });
          });

          Promise.all(requests).then(() => {
            resolve(monthTodosInfo);
          });
        }
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const signup = (userId: string, password: string): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db: IDBDatabase = await openDatabase();
      const tx: IDBTransaction = db.transaction(databaseConfig.userStoreName, "readwrite");
      const store: IDBObjectStore = tx.objectStore(databaseConfig.userStoreName);

      store.index("userId").get(userId).onsuccess = async (event) => {
        const result = await (event.target as IDBRequest).result;
        if (result) {
          reject(new Error("User already exists"));
        } else {
          const salt: string = CryptoJS.lib.WordArray.random(128 / 8).toString();
          const hashedPassword: string = CryptoJS.PBKDF2(password, salt, {
            keySize: 512 / 32,
            iterations: 10000,
          }).toString();

          const newUser: User & { salt: string } = {
            userId,
            password: hashedPassword,
            salt,
          };

          store.add(newUser).onsuccess = (addEvent) => {
            const data = (addEvent.target as IDBRequest).result;
            store.get(data).onsuccess = (getEvent) => {
              const getData = (getEvent.target as IDBRequest).result;
              resolve(getData);
            };
          };
        }
      };
    } catch (err) {
      reject();
    }
  });
};

const login = (
  userId: string,
  password: string
): Promise<{ userId: string; accessToken: Promise<string>; refreshToken: Promise<string> }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db: IDBDatabase = await openDatabase();
      const tx: IDBTransaction = db.transaction(databaseConfig.userStoreName, "readonly");
      const store: IDBObjectStore = tx.objectStore(databaseConfig.userStoreName);
      store.index("userId").get(userId).onsuccess = (event) => {
        const result = (event.target as IDBRequest).result;

        if (!result) {
          reject(new Error("User not found"));
        } else {
          const passwordHash: string = CryptoJS.PBKDF2(password, result.salt, {
            keySize: 512 / 32,
            iterations: 10000,
          }).toString();

          if (passwordHash !== result.password) {
            reject();
            return;
          }

          const accessToken: Promise<string> = createJwt(userId, cookieConfig.accessExp, cookieConfig.accessKey);
          const refreshToken: Promise<string> = createJwt(userId, cookieConfig.refreshExp, cookieConfig.refreshKey);
          resolve({ userId: result.userId, accessToken, refreshToken });
        }
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

export const handlers = [
  rest.post("/refreshToken", async (req, res, ctx) => {
    const refreshToken: string = getCookie("refreshToken");

    try {
      const jwt: JWTVerifyResult = await jwtVerify(refreshToken, cookieConfig.refreshKey, {
        issuer: "calendar-todo-app",
        audience: "https://lee-front.github.io",
        algorithms: ["HS256"],
      });
      const userId: string = jwt.payload.userId as string;

      const token: string = await createJwt(userId, cookieConfig.accessExp, cookieConfig.accessKey);
      const accessTokenCookie = serialize("accessToken", token, cookieConfig.cookieOptions);
      return res(ctx.status(200), ctx.cookie("accessToken", accessTokenCookie));
    } catch (e) {
      const error = e as Error;
      if (error.code === "ERR_JWT_EXPIRED") {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        return res(ctx.status(301), ctx.json({ message: "Expired token" }));
      }
    }
  }),

  // auth관련
  rest.post("/login", async (req, res, ctx) => {
    try {
      const { userId, password }: User = await req.json();
      const response: {
        userId: string;
        accessToken: Promise<string>;
        refreshToken: Promise<string>;
      } = await login(userId, password);

      const accessToken: string = await response.accessToken;
      const refreshToken: string = await response.refreshToken;

      const accessTokenCookie = serialize("accessToken", accessToken, cookieConfig.cookieOptions);
      const refreshTokenCookie = serialize("refreshToken", refreshToken, cookieConfig.cookieOptions);

      return res(
        ctx.status(200),
        ctx.json({ userId }),
        ctx.cookie("accessToken", accessTokenCookie),
        ctx.cookie("refreshToken", refreshTokenCookie)
      );
    } catch (e) {
      return res(ctx.status(401), ctx.json({ message: "Invalid user" }));
    }
  }),

  rest.post("/signup", async (req, res, ctx) => {
    try {
      const { userId, password }: User = await req.json();
      await signup(userId, password);
      return res(ctx.status(200));
    } catch (e) {
      return res(ctx.status(409), ctx.json({ message: "already exists" }));
    }
  }),

  // 포스트 목록

  rest.get<Todo[]>("/post", async (req, res, ctx) => {
    const isValidToken: boolean = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const searchDate: string | null = req.url.searchParams.get("searchDate");
    const userId: string | null = req.url.searchParams.get("userId");
    if (searchDate && userId) {
      const todos = await searchTodos(searchDate, userId);
      return res(ctx.status(200), ctx.json(todos));
    }
    return res(ctx.status(400), ctx.json({ message: "Invalid date range" }));
  }),

  // 투두 추가
  rest.post("/post", async (req, res, ctx) => {
    const isValidToken: boolean = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const { date, userId }: { date: string; userId: string } = await req.json();
    const response = await addTodo(date, userId);
    return res(ctx.status(201), ctx.json(response));
  }),

  rest.put<Todo>("/post", async (req, res, ctx) => {
    const isValidToken: boolean = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const todo: Todo = await req.json();
    const data = await updateTodo(todo);
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.delete("/post", async (req, res, ctx) => {
    const isValidToken: boolean = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const { id, userId, selectDate } = await req.json();
    deleteTodo(id, userId, selectDate);
    return res(ctx.status(200));
  }),

  // 달력관련
  rest.get("/calendar", async (req, res, ctx) => {
    const isValidToken = await validateToken();

    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }

    const startDate = req.url.searchParams.get("startDate");
    const endDate = req.url.searchParams.get("endDate");
    const userId = req.url.searchParams.get("userId");

    if (startDate && endDate && userId) {
      const todos = await searchCalendar(startDate, endDate, userId);
      return res(ctx.status(200), ctx.json(todos));
    } else {
      return res(ctx.status(400), ctx.json({ message: "Invalid date range" }));
    }
  }),

  rest.post("postItStyle", async (req, res, ctx) => {
    const isValidToken = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const params = await req.json();
    const response = await addPostItStyle(params.date, params.userId, params.color);
    return res(ctx.status(201), ctx.json(response));
  }),
];
