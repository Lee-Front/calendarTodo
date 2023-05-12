import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
const { worker } = require("./mocks/browser");

worker.start({
  serviceWorker: {
    url: "./mockServiceWorker.tsx",
  },
});

const basename = process.env.NODE_ENV === "production" ? "/calendarTodo" : "";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
