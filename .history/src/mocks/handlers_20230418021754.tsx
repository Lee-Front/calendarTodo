import { rest } from "msw";

interface Todo {
  id: number;
  text: string;
  check: boolean;
  sort: number;
}

const posts: Todo[] = [
  { id: 1, text: "테스트1", check: false, sort: 0 },
  { id: 1, text: "테스트1", check: false, sort: 0 },
  { id: 1, text: "테스트1", check: false, sort: 0 },
];

export const handlers = [
  // 포스트 목록
  rest.get<Todo[]>("/posts", (req, res, ctx) => {
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
