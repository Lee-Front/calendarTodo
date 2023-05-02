import { rest } from "msw";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

const dbName = "todos_db";
const storeName = "todos_store";

// 기본 데이터
const posts: Todo[] = [
  { id: 1, text: "테스트1", check: false, sort: 1 },
  { id: 2, text: "테스트2", check: false, sort: 2 },
  { id: 3, text: "테스트3", check: false, sort: 3 },
];

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
    };

    request.onsuccess = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const tx: IDBTransaction = db.transaction(storeName, "readwrite");
      const store: IDBObjectStore = tx.objectStore(storeName);
      for (let todo of posts) {
        store.add(todo);
      }

      resolve(db);
    };
  });
};

const addTodo = (todo: string): Promise<IDBValidKey> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);

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
            text: todo,
            check: false,
            sort: maxSort + 1,
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

const searchTodos = (searchTitle?: string): Promise<Todo[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll(searchTitle);

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

openDatabase();

export const handlers = [
  // 포스트 목록
  rest.get<Todo[]>("/posts", async (req, res, ctx) => {
    const todos = await searchTodos();
    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.post("/post", async (req, res, ctx) => {
    const data = await req.text();
    const response = await addTodo(data);
    return res(ctx.status(201), ctx.json(response));
  }),

  rest.put<Todo>("/post", async (req, res, ctx) => {
    const data = await updateTodo(req.body as Todo);
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.delete("/post", async (req, res, ctx) => {
    console.log(req.body);
    //deleteTodo(req.body.id as number);
    return res(ctx.status(200));
  }),
];
