import axios from "axios";
import React from "react";

const App = () => {
  fetch("/post");

  axios
    .get("/post")
    .then((response) => response.json())
    .then((data) => console.log(data));
  return (
    <>
      <div>Todo</div>
    </>
  );
};

export default App;
