import axios from "axios";
import React from "react";

const App = () => {
  axios.get("/posts").then((res) => console.log(res.data));
  axios.post("/post", "테스트");
  axios.get("/posts").then((res) => console.log(res.data));
  return (
    <>
      <div>Todo</div>
      <button>조회</button>
      <button>추가</button>
    </>
  );
};

export default App;
