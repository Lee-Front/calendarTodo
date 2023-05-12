import { rest } from "msw";
import { SignJWT, jwtVerify } from "jose";
import CryptoJS from "crypto-js";
import { serialize, CookieSerializeOptions } from "cookie";
import Cookies from "js-cookie";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
  date: Date;
}

interface SearchCalendarResult {
  [key: string]: { total: number; completed: number };
}

const DBName = "todos_db";
const todoStoreName = "todos_store";
const userStoreName = "user_store";
const JWT_ACCESS_TEXT = "calendar-todo-secret-lee-dawn-access-token-1154";
const JWT_REFRESH_TEXT = "calendar-todo-secret-lee-dawn-refresh-token-3390";

const encoder = new TextEncoder();
const accessKey = encoder.encode(JWT_ACCESS_TEXT);
const refreshKey = encoder.encode(JWT_REFRESH_TEXT);

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

const validateToken = async (token: string, key: Uint8Array) => {
  try {
    const jwt = await jwtVerify(token, key, {
      issuer: "calendar-todo-app",
      audience: "https://lee-front.github.io",
      algorithms: ["HS256"],
    });
    const exp = jwt.payload?.exp;

    if (exp) {
      const now = new Date().getTime() / 1000;
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
      const todoStore = db.createObjectStore(todoStoreName, { keyPath: "id", autoIncrement: true });
      todoStore.createIndex("sort", "sort", { unique: true });
      todoStore.createIndex("date", "date", { unique: false });
      const userStore = db.createObjectStore(userStoreName, { keyPath: "id", autoIncrement: true });
      userStore.createIndex("userId", "userId", { unique: true });
    };

    request.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
  });
};

const addTodo = (date: string): Promise<IDBValidKey> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(todoStoreName, "readwrite");
      const store = tx.objectStore(todoStoreName);
      const createDate = new Date(date);

      // 가장 큰 id 값을 조회합니다.
      const getMaxIdRequest = store.openCursor(null, "prev");

      getMaxIdRequest.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        const maxId = cursor?.value?.id ?? 0;

        const getMaxSortRequest = store.index("sort").openCursor(null, "prev");
        getMaxSortRequest.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
          const maxSort = cursor?.value?.sort ?? 0;
          // 새로운 todo 객체를 추가합니다.
          const newTodo = {
            id: maxId + 1,
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
          addRequest.onerror = () => {
            reject();
          };
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

const searchTodos = (date: string): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(todoStoreName, "readonly");
      const store = tx.objectStore(todoStoreName);

      if (date !== null) {
        const index = store.index("date");
        const searchDate = new Date(date);
        const request = index.getAll(IDBKeyRange.only(searchDate));
        request.onerror = () => {
          console.error("search error");
          reject();
        };

        request.onsuccess = (event) => {
          const todos = (event.target as IDBRequest<Todo[]>).result;
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

const searchCalendar = (startDate: string, endDate: string): Promise<SearchCalendarResult> => {
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
          //const date = cursor.key;
          const date = new Date(cursor.key);
          const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

          if (!todosByDate[dateStr]) {
            todosByDate[dateStr] = [];
          }
          todosByDate[dateStr].push(cursor.value);
          cursor.continue();
        } else {
          const dates = Object.keys(todosByDate);

          const monthTodosInfo: {
            [key: string]: { total: number; completed: number };
          } = {};
          dates.map((item) => {
            const completedTodos = todosByDate[item].filter((v: Todo) => v.check);

            monthTodosInfo[item] = {
              total: todosByDate[item].length,
              completed: completedTodos.length,
            };
          });

          resolve(monthTodosInfo);
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
      } else {
        reject();
      }
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const login = (userId: string, password: string): Promise<{ userId: string; token: Promise<string> }> => {
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
          const passwordHash = CryptoJS.PBKDF2(password, userData.salt, {
            keySize: 512 / 32,
            iterations: 10000,
          }).toString();

          if (passwordHash !== userData.password) {
            reject();
          }

          const token = createJwt(userId, "60s");
          resolve({ userId: userData.userId, token });

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
    console.log("리프레쉬");
    const { refreshToken } = await req.json();
    const cookieOptions: CookieSerializeOptions = {
      httpOnly: true,
      secure: true, // HTTPS 프로토콜에서만 전송 가능
      maxAge: 60,
      sameSite: "strict",
    };
    const token = await createJwt(refreshToken, "2h");
    const cookie = serialize("accessToken", token, cookieOptions);
    return res(ctx.status(200), ctx.cookie("accessToken", cookie));
  }),

  // auth관련
  rest.post("/login", async (req, res, ctx) => {
    const { userId, password } = await req.json();
    const response = await login(userId, password);
    const token = await response.token;

    const cookieOptions: CookieSerializeOptions = {
      httpOnly: true,
      secure: true, // HTTPS 프로토콜에서만 전송 가능
      maxAge: 60,
      sameSite: "strict",
    };
    const cookie = serialize("accessToken", token, cookieOptions);
    return res(ctx.status(200), ctx.json({ userId }), ctx.cookie("accessToken", cookie));
  }),

  rest.post("/signup", async (req, res, ctx) => {
    const { userId, password } = await req.json();
    await signup(userId, password);
    return res(ctx.status(200));
  }),

  // 포스트 목록

  rest.get<Todo[]>("/posts", async (req, res, ctx) => {
    const searchDate = req.url.searchParams.get("searchDate");
    if (searchDate) {
      const todos = await searchTodos(searchDate);
      return res(ctx.status(200), ctx.json(todos));
    }
    return res(ctx.status(400), ctx.json({ message: "Invalid date range" }));
  }),

  // 투두 추가
  rest.post("/post", async (req, res, ctx) => {
    const params = await req.json();
    const response = await addTodo(params.date);
    return res(ctx.status(201), ctx.json(response));
  }),

  rest.put<Todo>("/post", async (req, res, ctx) => {
    const data = await updateTodo(req.body as Todo);
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.delete("/post", async (req, res, ctx) => {
    const data = await req.json();
    deleteTodo(data.id);
    return res(ctx.status(200));
  }),

  // 달력관련
  rest.get("/calendar", async (req, res, ctx) => {
    //const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const token = Cookies.get("accessToken")?.split("=")[1]?.split(";")[0];
    const isValidToken = await validateToken(token ?? "");
    console.log("isValidToken : ", isValidToken);

    if (!isValidToken) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }

    const startDate = req.url.searchParams.get("startDate");
    const endDate = req.url.searchParams.get("endDate");

    if (startDate && endDate) {
      const todos = await searchCalendar(startDate, endDate);
      return res(ctx.status(200), ctx.json(todos));
    } else {
      return res(ctx.status(400), ctx.json({ message: "Invalid date range" }));
    }
  }),
];
