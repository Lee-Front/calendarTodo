import axios from "axios";
import React from "react";

const App = () => {
  axios.get("/posts").then((data) => console.log(data));
  return (
    <>
      <div>Todo</div>
    </>
  );
};

export default App;
