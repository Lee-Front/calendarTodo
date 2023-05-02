import React from "react";
import { render } from "react-dom";

const App = () => {
  console.log("a");

  fetch("/posts")
    .then((response) => response.json())
    .then((data) => console.log(data));
  return (
    <>
      <div>Todo</div>
    </>
  );
};

export default App;
