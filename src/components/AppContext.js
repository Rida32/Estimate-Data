import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const DataProvider = ({ children }) => {
  const [mainPayload, setmainPayload] = useState({
    formData: {},
    items: [],
    images: [],
  });
  const [customers, setCustomers] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [estimateData, setEstimateData] = useState({
    formData: {},
    items: [],
    images: [],
  });
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <AppContext.Provider
      value={{
        mainPayload,
        setmainPayload,
        estimates,
        setEstimates,
        snackbar,
        estimateData,
        setEstimateData,
        setSnackbar,
        handleSnackbarClose,
        customers,
        setCustomers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppData = () => useContext(AppContext);
