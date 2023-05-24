import { rest } from "msw";
import { SignJWT, jwtVerify, JWTVerifyResult } from "jose";
import CryptoJS from "crypto-js";
import { serialize, CookieSerializeOptions } from "cookie";
import Cookies from "js-cookie";

import { Todo } from "../types/todoTypes";
import { Error } from "../types/commonTypes";
import { SearchCalendarResult } from "../types/calendarTypes";

const DBName = "todos_db";
const todoStoreName = "todos_store";
const userStoreName = "user_store";
const styleStoreName = "style_store";
const JWT_ACCESS_TEXT = "calendar-todo-secret-lee-dawn-access-token-1154";
const JWT_REFRESH_TEXT = "calendar-todo-secret-lee-dawn-refresh-token-3390";

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

const getCookie = (name: string): string => {
  return Cookies.get(name)?.split("=")[1]?.split(";")[0] ?? "";
};

// 토큰 유효시간을 지정할 변수
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
    const jwt: JWTVerifyResult = await jwtVerify(token, accessKey, {
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
    const request: IDBOpenDBRequest = indexedDB.open(DBName, 2);

    request.onerror = () => {
      console.error("db open err");
      reject();
    };

    request.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const todoStore: IDBObjectStore = db.createObjectStore(todoStoreName, { keyPath: "id", autoIncrement: true });
      todoStore.createIndex("sort", ["userId", "date"], { unique: false });
      todoStore.createIndex("date", ["userId", "date"], { unique: false });
      const userStore: IDBObjectStore = db.createObjectStore(userStoreName, { keyPath: "id", autoIncrement: true });
      userStore.createIndex("userId", "userId", { unique: true });
      const styleStore: IDBObjectStore = db.createObjectStore(styleStoreName, { keyPath: "id", autoIncrement: true });
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
      const tx: IDBTransaction = db.transaction(todoStoreName, "readwrite");
      const store: IDBObjectStore = tx.objectStore(todoStoreName);
      const createDate: Date = new Date(date);
      store.index("sort").openCursor([userId, createDate], "prev").onsuccess = async (event) => {
        const cursor = await (event.target as IDBRequest).result;
        const maxSort: number = cursor?.value?.sort ?? 0;

        const newTodo = {
          userId,
          text: "",
          check: false,
          sort: maxSort + 1,
          date: createDate,
        };

        const addRequest = store.add(newTodo);
        addRequest.onsuccess = () => {
          const getRequest = store.get(addRequest.result);
          getRequest.onsuccess = () => {
            resolve(getRequest.result);
          };
          getRequest.onerror = () => {
            reject();
          };
        };
        addRequest.onerror = (err) => {
          console.log("err", err);
          reject();
        };
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const deleteTodo = (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(todoStoreName, "readwrite");
      const store = tx.objectStore(todoStoreName);
      const request = store.delete(id);

      request.onerror = (event) => {
        console.error("IndexedDB delete error: " + (event.target as any).errorCode);
        reject();
      };

      request.onsuccess = (event) => {
        console.log("IndexedDB delete success");
        resolve();
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const updateTodo = (todo: Todo): Promise<IDBValidKey> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(todoStoreName, "readwrite");
      const store = tx.objectStore(todoStoreName);
      const request = store.get(todo.id);
      request.onerror = (event) => {
        console.error("IndexedDB update error: " + (event.target as any).errorCode);
        reject();
      };

      request.onsuccess = async (event) => {
        console.log("IndexedDB update success");
        const data = await request.result;
        if (data) {
          todo.date = new Date(todo.date);
          store.put(todo);
        } else {
          console.error("Todo not found");
        }
        tx.oncomplete = () => {
          resolve(request.result);
        };
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const searchTodos = (date: string, userId: string): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(todoStoreName, "readonly");
      const store = tx.objectStore(todoStoreName);

      if (date !== null && userId !== null) {
        const index = store.index("date");
        const searchDate = new Date(date);
        const request = index.getAll(IDBKeyRange.only(searchDate));
        request.onerror = () => {
          console.error("search error");
          reject();
        };

        request.onsuccess = (event) => {
          const result = (event.target as IDBRequest<Todo[]>).result;
          const todos = result.filter((todo) => todo.userId === userId);

          resolve(todos);
        };
      } else {
        reject();
      }
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
      const db = await openDatabase();
      const tx = db.transaction(styleStoreName, "readwrite");
      const store = tx.objectStore(styleStoreName);

      const createDate = new Date(date);
      const index = store.index("composite");
      index.get([userId, createDate]).onsuccess = async (event) => {
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
          store.add(newStyle).onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            console.log("cursor : ", cursor);
          };
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
      const db = await openDatabase();
      const tx = db.transaction(todoStoreName, "readonly");
      const store = tx.objectStore(todoStoreName);
      const range = IDBKeyRange.bound(new Date(startDate), new Date(endDate));

      const request = store.index("date").openCursor(range);
      const todosByDate: { [key: string]: Todo[] } = {};
      request.onsuccess = async (event) => {
        const cursor = await (event.target as IDBRequest).result;

        if (cursor) {
          if (cursor.value.userId === userId) {
            const date = new Date(cursor.key);
            const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

            if (!todosByDate[dateStr]) {
              todosByDate[dateStr] = [];
            }
            todosByDate[dateStr].push(cursor.value);
          }

          cursor.continue();
        } else {
          const dates = Object.keys(todosByDate);
          const styleTx = db.transaction(styleStoreName, "readonly");
          const styleStore = styleTx.objectStore(styleStoreName);
          const styleRequest = styleStore.index("composite");

          const monthTodosInfo: {
            [key: string]: { total: number; completed: number; color?: { r: number; g: number; b: number } };
          } = {};
          const requests = dates.map((item) => {
            const completedTodos = todosByDate[item].filter((v: Todo) => v.check);
            const createDate = new Date(item);
            monthTodosInfo[item] = {
              total: todosByDate[item].length,
              completed: completedTodos.length,
            };
            return new Promise((resolve) => {
              styleRequest.get([userId, createDate]).onsuccess = async (event) => {
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
      const db = await openDatabase();
      const tx = db.transaction(userStoreName, "readwrite");
      const store = tx.objectStore(userStoreName);
      if (userId !== null && password !== null) {
        const userIdIndex = store.index("userId");

        userIdIndex.get(userId).onsuccess = async (event) => {
          const cursor = await (event.target as IDBRequest).result;
          if (cursor) {
            reject(new Error("User already exists"));
          } else {
            const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
            const hashedPassword = CryptoJS.PBKDF2(password, salt, { keySize: 512 / 32, iterations: 10000 }).toString();

            const newUser = {
              userId,
              password: hashedPassword,
              salt,
            };

            const addRequest = store.add(newUser);
            addRequest.onsuccess = () => {
              const getRequest = store.get(addRequest.result);
              getRequest.onsuccess = () => {
                resolve(getRequest.result);
              };
              getRequest.onerror = () => {
                reject();
              };
            };
            addRequest.onerror = () => {
              reject();
            };
          }
        };
      } else {
        reject();
      }
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
      const db = await openDatabase();
      const tx = db.transaction(userStoreName, "readonly");
      const store = tx.objectStore(userStoreName);
      const userIdIndex = store.index("userId");

      if (userId !== null && password !== null) {
        const getRequest = userIdIndex.get(userId);

        getRequest.onsuccess = () => {
          const userData = getRequest.result;
          if (!userData) {
            reject(new Error("User not found"));
          } else {
            const passwordHash = CryptoJS.PBKDF2(password, userData.salt, {
              keySize: 512 / 32,
              iterations: 10000,
            }).toString();

            if (passwordHash !== userData.password) {
              reject();
              return;
            }

            const accessToken = createJwt(userId, accessExp, accessKey);
            const refreshToken = createJwt(userId, refreshExp, refreshKey);
            resolve({ userId: userData.userId, accessToken, refreshToken });
          }

          getRequest.onerror = () => {
            reject();
          };
        };
      } else {
        reject();
      }
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

export const handlers = [
  rest.post("/refreshToken", async (req, res, ctx) => {
    const refreshToken = getCookie("refreshToken");

    try {
      const jwt: JWTVerifyResult = await jwtVerify(refreshToken, refreshKey, {
        issuer: "calendar-todo-app",
        audience: "https://lee-front.github.io",
        algorithms: ["HS256"],
      });
      const userId: string = jwt.payload.userId as string;

      const token = await createJwt(userId, accessExp, accessKey);
      const accessTokenCookie = serialize("accessToken", token, cookieOptions);
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
      const { userId, password } = await req.json();
      const response = await login(userId, password);

      const accessToken = await response.accessToken;
      const refreshToken = await response.refreshToken;

      const accessTokenCookie = serialize("accessToken", accessToken, cookieOptions);
      const refreshTokenCookie = serialize("refreshToken", refreshToken, cookieOptions);

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
      const { userId, password } = await req.json();
      await signup(userId, password);
      return res(ctx.status(200));
    } catch (e) {
      return res(ctx.status(409), ctx.json({ message: "already exists" }));
    }
  }),

  // 포스트 목록

  rest.get<Todo[]>("/post", async (req, res, ctx) => {
    const isValidToken = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const searchDate = req.url.searchParams.get("searchDate");
    const userId = req.url.searchParams.get("userId");
    if (searchDate && userId) {
      const todos = await searchTodos(searchDate, userId);
      return res(ctx.status(200), ctx.json(todos));
    }
    return res(ctx.status(400), ctx.json({ message: "Invalid date range" }));
  }),

  // 투두 추가
  rest.post("/post", async (req, res, ctx) => {
    const isValidToken = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const params = await req.json();
    const response = await addTodo(params.date, params.userId);
    return res(ctx.status(201), ctx.json(response));
  }),

  rest.put<Todo>("/post", async (req, res, ctx) => {
    const isValidToken = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const data = await updateTodo(req.body as Todo);
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.delete("/post", async (req, res, ctx) => {
    const isValidToken = await validateToken();
    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }
    const data = await req.json();
    deleteTodo(data.id);
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
