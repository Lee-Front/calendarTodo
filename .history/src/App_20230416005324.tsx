import axios from "axios";
import React from "react";

const App = () => {
  axios.get("/posts").then((response) => response.data.json());
  return (
    <>
      <div>Todo</div>
    </>
  );
};

export default App;
