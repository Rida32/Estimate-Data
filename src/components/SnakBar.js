import React from 'react'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useAppData } from "./AppContext";



const SnakBar = () => {
    const { snackbar, handleSnackbarClose } = useAppData();


  return (
    <>
    <Snackbar
     open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ zIndex: 9999 }}
    >
      <MuiAlert
        variant="filled"
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </MuiAlert>
    </Snackbar>  
  

    </>
  )
}

export default SnakBar