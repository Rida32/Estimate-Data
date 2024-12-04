import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const DataProvider = ({ children }) => {
  const [mainPayload, setmainPayload] = useState({itemsData:[]});
  const [estimates, setEstimates] = useState([]);


  return (
    <AppContext.Provider value={{ mainPayload, setmainPayload, estimates, setEstimates }}>
      {children}
    </AppContext.Provider>
  
  );
};
export const useAppData = () => useContext(AppContext);