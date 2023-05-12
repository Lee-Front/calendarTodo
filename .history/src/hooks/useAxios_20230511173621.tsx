import React from "react";
import { useState, useEffect } from "react";
import axios, { Method } from "axios";

type DataType = {
  name: string;
  age: number;
};

const useAxios = (method: Method, url: string) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios[method]<T>(url);
      setData(response.data);
    };
    getData();
  }, [url]);

  return data;
};

export default useAxios;
