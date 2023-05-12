import { setupWorker, setupServer } from "msw";
import { handlers } from "./handlers";

export const worker = setupServer(...handlers);
