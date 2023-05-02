import React from "react";
import { render } from "react-dom";

const App = () => {
  fetch("/post")
    .then((response) => response.json())
    .then((data) => console.log(data));
  return (
    <>
      <div>Todo</div>
    </>
  );
};

export default App;
