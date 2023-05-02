import { rest } from "msw";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

const dbName = "todos_db";
const storeName = "todos_store";

// IndexedDB 데이터베이스 열기
const request = indexedDB.open(dbName);

request.onerror = (event) => {
  console.error("IndexedDB database error: " + event.target.errorCode);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // todos_store가 존재하지 않으면 새로 생성
  const store = db.createObjectStore(storeName, { keyPath: "id" });

  // 인덱스 생성
  store.createIndex("title", "title", { unique: false });
  store.createIndex("completed", "completed", { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;

  // 데이터 추가
  const addTodo = (todo: Todo) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.add(todo);

    request.onerror = (event) => {
      console.error("IndexedDB add error: " + event.target.errorCode);
    };

    request.onsuccess = (event) => {
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
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const titleIndex = store.index("title");
    const request = titleIndex.getAll(searchTitle);

    request.onerror = (event) => {
      console.error("IndexedDB search error: " + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      console.log("IndexedDB search success");
      const todos = event.target.result as Todo[];
      console.log(todos);
    };
  };

  searchTodos("Buy groceries");

  // 데이터 삭제
  const deleteTodo = (id: number) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.delete(id);

    request.onerror = (event) => {
      console.error("IndexedDB delete error: " + event.target.errorCode);
    };

    request.onsuccess = (event) => {
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
