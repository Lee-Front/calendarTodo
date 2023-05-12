import { setupWorker, RestHandler, MockedRequest, DefaultBodyType, ResponseComposition, RestContext } from "msw";
import { handlers } from "./handlers";

const authInterceptor: RestHandler = (
  req: MockedRequest<DefaultBodyType>,
  res: ResponseComposition,
  ctx: RestContext
) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Access token is expired. Fetch a new access token with refresh token.
      return fetch("/refresh-token")
        .then(() => ctx.fetch(req))
        .catch(() => Promise.reject({ status: 401 }));
    }
    req.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return ctx.fetch(req);
};

export const worker = setupWorker(...handlers);
