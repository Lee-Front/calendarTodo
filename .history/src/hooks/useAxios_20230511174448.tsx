import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

type HttpMethod = "get" | "post" | "put" | "delete";
type DataType = {
  name: string;
  age: number;
};

const useAxios = (method: HttpMethod, url: string) => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      //const response: AxiosResponse = await axios.get(url);
      const response = await axios[method](url);
      setData(response.data);
    };
    getData();
  }, [url]);

  return data;
};

export default useAxios;
