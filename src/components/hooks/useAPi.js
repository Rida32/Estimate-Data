import { useState } from "react";
import axios from "axios";

const useAPi = () => {
  const  baseUrl ="http://192.168.18.35:9000"
  const postData = async (
    endPoint,
    data,
    success = () => {},
    errorFun = () => {}
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/api${endPoint}`,data);
      success(response.data)
      console.log("response getListData", response.data);
    } catch (error) {
      console.error("Error fetching list data:", error);
      errorFun(error);
    }
  };

  return { postData  }
}

export default useAPi