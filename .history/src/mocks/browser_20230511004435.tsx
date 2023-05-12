import { setupWorker } from "msw";
import { handlers } from "./handlers";

const authInterceptor = (req, handler) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Access token is expired. Fetch a new access token with refresh token.
      return fetch("/refresh-token")
        .then(() => handler(req))
        .catch(() => Promise.reject({ status: 401 }));
    }
    req.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return handler(req);
};

export const worker = setupWorker(...handlers);
