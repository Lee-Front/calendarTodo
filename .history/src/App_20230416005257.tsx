import axios from "axios";
import React from "react";

const App = () => {
  axios
    .get("/post")
    .then((response) => response)
    .then((data) => console.log(data));
  return (
    <>
      <div>Todo</div>
    </>
  );
};

export default App;
