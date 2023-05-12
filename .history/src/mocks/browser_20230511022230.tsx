import { setupWorker } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const worker = setupServer(...handlers);
