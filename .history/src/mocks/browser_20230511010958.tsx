import { setupWorker } from "msw";
import { handlers, authInterceptor } from "./handlers";

export const worker = setupWorker(...handlers, authInterceptor);
