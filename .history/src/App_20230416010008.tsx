import axios from "axios";
import React from "react";

const App = () => {
  return (
    <>
      <div>Todo</div>
      <button
        onClick={() => {
          axios.get("/posts").then((res) => console.log(res.data));
        }}
      >
        조회
      </button>
      <button
        onClick={() => {
          axios.post("/post", "테스트");
        }}
      >
        추가
      </button>
    </>
  );
};

export default App;
