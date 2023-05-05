import { rest } from "msw";
import { generateSecret, SignJWT, generateKeyPair } from "jose";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
  date: Date;
}

interface SearchCalendarResult {
  [key: string]: { total: number; completed: number };
  //token: string;
}

const dbName = "todos_db";
const storeName = "todos_store";
const JWT_SECRET = "calendar-todo-secret-lee-dawn";

const createJwt = async (): Promise<string> => {
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(JWT_SECRET);
  return new SignJWT({ "urn:calendarTodo:claim": true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("calendar-todo-app")
    .setAudience("https://lee-front.github.io")
    .setExpirationTime("2h")
    .sign(secretKey);
};

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open(dbName);

    request.onerror = () => {
      console.error("db open err");
      reject();
    };

    request.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const store = db.createObjectStore(storeName, { keyPath: "id" });
      store.createIndex("sort", "sort", { unique: true });
      store.createIndex("date", "date", { unique: false });
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
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const createDate = new Date(date);

      // 가장 큰 id 값을 조회합니다.
      const getMaxIdRequest = store.openCursor(null, "prev");

      getMaxIdRequest.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        const maxId = cursor?.value?.id ?? 0;

        const getMaxSortRequest = store.index("sort").openCursor(null, "prev");
        getMaxSortRequest.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>)
            .result;
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
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.delete(id);

      request.onerror = (event) => {
        console.error(
          "IndexedDB delete error: " + (event.target as any).errorCode
        );
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
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.get(todo.id);
      request.onerror = (event) => {
        console.error(
          "IndexedDB update error: " + (event.target as any).errorCode
        );
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
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);

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

const searchCalendar = (
  startDate: string,
  endDate: string
): Promise<SearchCalendarResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
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
            const completedTodos = todosByDate[item].filter(
              (v: Todo) => v.check
            );

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

const login = (date: string): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);

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

export const handlers = [
  rest.post("/login", async (req, res, ctx) => {
    const params = await req.json();
    console.log("params : ", params);
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
