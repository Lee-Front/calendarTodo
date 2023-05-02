import { rest } from "msw";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
  date: string;
}

const dbName = "todos_db";
const storeName = "todos_store";

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

const addTodo = (date: {
  year: number;
  month: number;
  day: number;
}): Promise<IDBValidKey> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);

      console.log("date: ", date);

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
          const date = new Date();
          // 새로운 todo 객체를 추가합니다.
          const newTodo = {
            id: maxId + 1,
            text: "",
            check: false,
            sort: maxSort + 1,
            date: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`,
          };
          console.log("newTodo : ", newTodo);

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
      console.log("id : ", id);

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

const searchTodos = (
  searchTitle?: string | null,
  searchDate?: string | null
): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);

      let request;
      if (searchDate !== null) {
        const index = store.index("date");
        console.log("searchDate : ", searchDate);
        request = index.getAll(IDBKeyRange.only(searchDate));
      } else {
        request = store.getAll();
      }

      request.onerror = () => {
        console.error("search error");
        reject();
      };

      request.onsuccess = (event) => {
        const todos = (event.target as IDBRequest<Todo[]>).result;
        resolve(todos);
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

const searchCalendar = (searchDate: string | null): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);

      const range = IDBKeyRange.bound("2023-4-01", "2023-4-30");
      const request = store.index("date").openCursor(range);

      const todosByDate: { [key: string]: any } = {};
      request.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          console.log("cursor.value: ", cursor.value);
          const date = cursor.value.date;
          if (!todosByDate[date]) {
            todosByDate[date] = [];
          }
          todosByDate[date].push(cursor.value);
          cursor.continue();
        } else {
          console.log(todosByDate);
        }
      };
    } catch (err) {
      console.error(err);
      reject();
    }
  });
};

openDatabase();

export const handlers = [
  // 포스트 목록
  rest.get<Todo[]>("/posts", async (req, res, ctx) => {
    const year = req.url.searchParams.get("year");
    const month = req.url.searchParams.get("month");
    const day = req.url.searchParams.get("day");

    const date = `${year}-${month}-${day}`;

    const todos = await searchTodos(null, date);
    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.post("/post", async (req, res, ctx) => {
    const params = await req.json().then((data) => {
      console.log("data : ", data);
    });
    const response = await addTodo(params);
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

  rest.get("/calendar", async (req, res, ctx) => {
    const year = req.url.searchParams.get("year");
    const month = req.url.searchParams.get("month");

    const date = `${year}-${month}`;

    const todos = await searchCalendar(date);
    return res(ctx.status(200), ctx.json(todos));
  }),
];
