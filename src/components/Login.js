import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppData } from "./AppContext";
import SnakBar from "./SnakBar";
import useAPi from "./hooks/useAPi";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleSnackbarOpen } = useAppData();
  const { postData } = useAPi();
 


  const isButtonEnabled = email.trim() !== "" && password.trim() !== "";

 
  const handleLogIn = () => {
    setIsSubmitted(true);

    if (!email.trim() || !password.trim()) {
      handleSnackbarOpen("Please fill in all fields.", "error");
      return;
    }
    setIsLoading(true);
    postData(
      `/auth/login`,
      { email: email.trim(), password: password.trim() },
      (data) => {
        setIsLoading(false);
        handleSnackbarOpen("Login successful!", "success");
        Cookies.set("token", data.token);
        Cookies.set("email", data.email);
        Cookies.set("firstName", data.firstName);
        Cookies.set("lastName", data.lastName);

        navigate("/estimates");
        console.log("test", data);
       
      },
      (error) => {
        handleSnackbarOpen(
          error?.response?.data?.message || "Unknown Error has occured",
          "error"
        );
      }
    );
  };

  return (
    <>
      <SnakBar />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-sm p-4"
          style={{ width: "400px", borderRadius: "10px" }}
        >
          <h5 className="text-center mb-3">Personal Information</h5>
          <p className="text-center text-muted mb-4">
            Enter your e-mail address and your password.
          </p>
          <form>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isSubmitted && email.trim() === "" && (
                <span className="text-danger">Please fill the above field</span>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isSubmitted && password.trim() === "" && (
                <span className="text-danger">Please fill the above field</span>
              )}
            </div>
            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input me-2"
                />
                <label htmlFor="rememberMe" className="form-check-label">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-decoration-none text-success">
                Forgot Password ?
              </a>
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={handleLogIn}
                disabled={isLoading}
              >
                 {isLoading ? ( 
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "SIGN IN"
                )}
              </button>
            </div>
            <div className="mt-3 text-center">
              <a
                href="#"
                onClick={() => {
                  navigate("/CreateAccount");
                }}
              >
                {" "}
                Create Account
              </a>
            </div>
            <div className="text-center mt-3">
              <a href="#" className="text-decoration-none text-muted me-3">
                Privacy Policy
              </a>
              <a href="#" className="text-decoration-none text-muted">
                Terms & Conditions
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
