import { rest } from "msw";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

const dbName = "postsDb";
const storeName = "todos";

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    console.log("dbName : ", dbName);
    const request = window.indexedDB.open(dbName);

    request.onerror = (e) => {
      console.log("dp open is fail");
      return null;
    };
    request.onsuccess = (e) => {
      const db = (e.target as IDBRequest).result;
      resolve(db);
    };
    request.onupgradeneeded = (e) => {
      console.log("a");
      const db = (e.target as IDBRequest).result;
      db.createObjectStore(storeName, { keyPath: "id" });
    };
  });
};

const getTodos = async (): Promise<Todo[]> => {
  const db: IDBDatabase = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onerror = (event) => {
      reject("IndexedDB get error");
    };
    request.onsuccess = (e) => {
      const todos = (e.target as IDBRequest).result as Todo[];
      resolve(todos);
    };
  });
};

const posts: Todo[] = [
  { id: 1, text: "테스트1", check: false, sort: 1 },
  { id: 2, text: "테스트2", check: true, sort: 2 },
  { id: 3, text: "테스트3", check: false, sort: 3 },
];

export const handlers = [
  // 포스트 목록
  rest.get<Todo[]>("/posts", async (req, res, ctx) => {
    const todos = await getTodos();
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
