
import { useNavigate } from "react-router-dom";
import React, { useState  } from "react";
import axios from 'axios';
import { useAppData } from "./AppContext";
import SnakBar from "./SnakBar";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleSnackbarOpen } = useAppData();

  const isButtonEnabled = email.trim() !== '' && password.trim() !== '';

  const handleSignIn = async () => {
    setIsSubmitted(true);

    if (!email.trim() || !password.trim()) {
      handleSnackbarOpen("Please fill in all fields.", "error");
      return;
    }
  
    try {
      const response = await axios.post("http://192.168.18.35:9000/api/v2/auth/login", {
        email: email.trim(),
        password: password.trim(),

      });
      console.log("test", response.data)
      
    
        handleSnackbarOpen("Login successful!", "success");
        navigate("/estimates");
      
    } catch (error) {

      console.error("Login error:", error);
      handleSnackbarOpen(error?.response?.data?.message || "Unknown Error has occured" , "error");
    }
  };
  
  
  return (
    <>
    <SnakBar />
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ width: '400px', borderRadius: '10px' }}>
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
            {isSubmitted && email.trim() === '' && (
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
            {isSubmitted && password.trim() === '' && (
              <span className="text-danger">Please fill the above field</span>
            )}
          </div>
          {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox" id="rememberMe" className="form-check-input me-2" />
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
              onClick={handleSignIn}
              
            >
              SIGN IN
            </button>
          </div>
          <div className="mt-3 text-center" >
            <a href="#" onClick={()=>{navigate("/CreateAccount");}}> Create Account</a>
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
  )
}

export default Login