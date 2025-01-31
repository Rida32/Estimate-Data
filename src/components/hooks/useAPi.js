
import axios from "axios";

const useAPi = () => {
  const  baseUrl ="http://localhost:9000"
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
  const getData = async (
    endPoint,
    success = () => {},
    errorFun = () => {}
  ) => {
    try {
      const response = await axios.get(`${baseUrl}/api${endPoint}`);
      success(response.data)
      console.log("response getListData", response.data);
    } catch (error) {
      console.error("Error fetching list data:", error);
      errorFun(error);
    }
  };

  return { postData , getData }
}

export default useAPi