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
  { id: 2, text: "테스트2", check: true, sort: 2 },
  { id: 3, text: "테스트3", check: false, sort: 3 },
];

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
      console.error(
        "IndexedDB database error: " + (event.target as any).errorCode
      );
      reject();
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(storeName, { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      for (let todo of posts) {
        store.add(todo);
      }

      resolve(db);
    };
  });
};

const addTodo = (todo: Todo): Promise<IDBValidKey> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.add(todo);

      request.onerror = (event) => {
        console.log("event : ", event);
        console.error(
          "IndexedDB add error: " + (event.target as any).errorCode
        );
        reject();
      };

      request.onsuccess = (event) => {
        console.log("IndexedDB add success");
        resolve(request.result);
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
    console.log("2");

    const todos = await searchTodos();
    console.log("todos : ", todos);
    return res(ctx.status(200), ctx.json(posts));
  }),

  rest.post("/post", async (req, res, ctx) => {
    await req.text().then((data) => {
      const newPost: Todo = {
        id: posts.length + 1,
        text: data,
        check: false,
        sort: posts.length + 1,
      };
      posts.push(newPost);
    });
    return res(ctx.status(201));
  }),
];
