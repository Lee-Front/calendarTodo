import { rest } from "msw";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

const dbName: string = "todos_db";
const storeName: string = "todos_store";

const request: IDBOpenDBRequest = indexedDB.open(dbName);

request.onerror = (event: Event) => {
  console.error("IndexedDB database error: " + (event.target as any).errorCode);
};

request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
  const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

  // todos_store가 존재하지 않으면 새로 생성
  const store: IDBObjectStore = db.createObjectStore(storeName, {
    keyPath: "id",
  });

  // 인덱스 생성
  store.createIndex("title", "title", { unique: false });
  store.createIndex("completed", "completed", { unique: false });
};

request.onsuccess = (event: Event) => {
  const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

  // 데이터 추가
  const addTodo = (todo: Todo) => {
    const tx: IDBTransaction = db.transaction(storeName, "readwrite");
    const store: IDBObjectStore = tx.objectStore(storeName);
    const request: IDBRequest<IDBValidKey> = store.add(todo);

    request.onerror = (event: Event) => {
      console.error("IndexedDB add error: " + (event.target as any).errorCode);
    };

    request.onsuccess = (event: Event) => {
      console.log("IndexedDB add success");
    };
  };

  addTodo({
    id: 1,
    title: "Buy groceries",
    completed: false,
  });

  addTodo({
    id: 2,
    title: "Clean the house",
    completed: true,
  });

  // 데이터 검색
  const searchTodos = (searchTitle: string) => {
    const tx: IDBTransaction = db.transaction(storeName, "readonly");
    const store: IDBObjectStore = tx.objectStore(storeName);
    const titleIndex: IDBIndex = store.index("title");
    const request: IDBRequest<Todo[]> = titleIndex.getAll(searchTitle);

    request.onerror = (event: Event) => {
      console.error(
        "IndexedDB search error: " + (event.target as any).errorCode
      );
    };

    request.onsuccess = (event: Event) => {
      console.log("IndexedDB search success");
      const todos: Todo[] = (event.target as IDBRequest<Todo[]>).result;
      console.log(todos);
    };
  };

  searchTodos("Buy groceries");

  // 데이터 삭제
  const deleteTodo = (id: number) => {
    const tx: IDBTransaction = db.transaction(storeName, "readwrite");
    const store: IDBObjectStore = tx.objectStore(storeName);
    const request: IDBRequest = store.delete(id);

    request.onerror = (event: Event) => {
      console.error(
        "IndexedDB delete error: " + (event.target as any).errorCode
      );
    };

    request.onsuccess = (event: Event) => {
      console.log("IndexedDB delete success");
    };
  };

  deleteTodo(2);
};

const posts: Todo[] = [
  { id: 1, text: "테스트1", check: false, sort: 1 },
  { id: 2, text: "테스트2", check: true, sort: 2 },
  { id: 3, text: "테스트3", check: false, sort: 3 },
];

export const handlers = [
  // 포스트 목록
  rest.get<Todo[]>("/posts", async (req, res, ctx) => {
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
