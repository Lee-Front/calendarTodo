import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url: string) => {
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(url);
    };
    getData();
  }, [url]);
};

export default useAxios;
