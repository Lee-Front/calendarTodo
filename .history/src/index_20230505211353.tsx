import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
const { worker } = require("./mocks/browser");

worker.start({
  serviceWorker: {
    url: "./mockServiceWorker.js",
  },
});

console.log("process.env.NODE_ENV : ", process.env.NODE_ENV);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter basename="/calendarTodo">
    <App />
  </BrowserRouter>
);
