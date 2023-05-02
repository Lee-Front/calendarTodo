import axios from "axios";
import React from "react";

const App = () => {
  axios.get("/posts").then((res) => console.log(res.data));
  axios.post("/post", {});
  return (
    <>
      <div>Todo</div>
    </>
  );
};

export default App;
