import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
require("dotenv").config();
const { worker } = require("./mocks/browser");

console.log("proc : ", process.env.PUBLIC_URL);
worker.start({
  serviceWorker: {
    url: "./mockServiceWorker.js",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
);
