import { rest } from "msw";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

const dbName = "postsDb";
const storeName = "todos";

const openDB = () => {
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
    openDB().then((db) => {
      console.log("Db : ", db);
    });
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
