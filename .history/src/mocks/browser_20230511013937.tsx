import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers).use(async (req, res, ctx) => {
  // 인터셉터 로직을 작성합니다.
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.set("Authorization", `Bearer ${token}`);
  }

  // 등록된 다른 핸들러 함수들을 계속해서 실행합니다.
  return ctx.next(req, res);
});
