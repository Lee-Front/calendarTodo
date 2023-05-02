import axios from "axios";
import React from "react";

const App = () => {
  axios.get("/posts").then((res) => console.log(res.data));
  axios.post("/post", "테스트");
  axios.get("/posts").then((res) => console.log(res.data));
  return (
    <>
      <div>Todo</div>
    </>
  );
};

export default App;
