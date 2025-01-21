
import axios from "axios";
import Cookies from "js-cookie";

const useAPiAuth = () => {
  const token = Cookies.get("token");
  const baseUrl = "http://192.168.18.35:9000";


  const postData = async (
    endPoint,
    data,
    success = () => {},
    errorFun = () => {}
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/api${endPoint}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      success(response.data);
      console.log("response getListData", response.data);
    } catch (error) {
      console.error("Error fetching list data:", error);
      errorFun(error);
    }
  };
  const getData = async (endPoint, success = () => {}, errorFun = () => {}) => {
    try {
      const response = await axios.get(`${baseUrl}/api${endPoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      success(response.data);
      console.log("response getListData", response.data);
    } catch (error) {
      console.error("Error fetching list data:", error);
      errorFun(error);
    }
  };
  

  return { postData, getData,   };
};

export default useAPiAuth;
