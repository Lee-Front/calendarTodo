import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

type DataType = {
  name: string;
  age: number;
};

const useAxios = (url: string) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(url);
      setData(response.data);
    };
    getData();
  }, [url]);

  return data;
};

export default useAxios;
