import { setupWorker } from "msw";
import { handlers } from "./handlers";

console.log("handlers: ", handlers);

export const worker = setupWorker(...handlers);
