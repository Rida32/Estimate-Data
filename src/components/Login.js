
import { useNavigate } from "react-router-dom";
import React, { useState  } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isButtonEnabled = email.trim() !== '' && password.trim() !== '';
 
  const handleSignIn = () => {
    setIsSubmitted(true);
    if (isButtonEnabled) {
      navigate("/table");
    }
  };

  
  return (
    <>
    
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
              SIGN ME IN
            </button>
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