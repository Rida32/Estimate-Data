
import { useNavigate } from "react-router-dom";
import React, { useState  } from "react";
import { useAppData } from "./AppContext";
import useAPi from "./hooks/useAPi";
import validator from "validator";

const CreateAccount = () => {
    const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleSnackbarOpen } = useAppData();
  const { postData } = useAPi();

 
    const handleLogIn = ()=>{
      setIsSubmitted(true);
      if (!validator.isEmail(newUser.email)) {
        setErrorMessage("Please enter a valid Gmail address.");
        return;
      }
  
      if (newUser.password !== confirmPassword) {
        setPasswordError("Passwords do not match.");
        return;
      }
      setPasswordError("");
    setErrorMessage("");
    setLoading(true);

    setTimeout(() => {
    postData(
      `/auth/signup`,
      newUser,
      (data)=>{
        console.log("test", data)
        handleSnackbarOpen("Account created successfully!", "success");
        setNewUser({
          userType: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        setLoading(false);
        navigate("/");
      },
      (error)=>{
        handleSnackbarOpen("Failed to create account. Try again.", "error");
        setLoading(false);
      },



    );
  }, 3000);
    }

  return (
    <>
    
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ width: '500px', borderRadius: '10px' }}>
        <h5 className="text-center mb-3" style={{ fontWeight: 'bold', fontSize: '20px' }}>Personal Information</h5>
        <p className="text-center text-muted mb-4">
          Create Your  Account
        </p>
        <form>
        <div className="mb-3"><label className="label">User Type</label>
            <select 
              className="form-control"
              value={newUser.userType}
              onChange={(e) => setNewUser({...newUser, userType:e.target.value})}>
                <option value="">Select User Type</option>
                <option value="0">Admin</option>
                <option value="1">User</option>
                <option value="2">Customer</option>
              </select>
            {isSubmitted && newUser.userType.trim() === '' && (
              <span className="text-danger">Please fill the above field</span>
            )}
          </div>
        <div className="mb-3"><label className="label">First Name</label>
            <input
             
              className="form-control"
              placeholder="first name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({...newUser, firstName:e.target.value})}
            />
            {isSubmitted && newUser.firstName.trim() === '' && (
              <span className="text-danger">Please fill the above field</span>
            )}
          </div>
          <div className="mb-3"><label className="label">Last Name</label>
            <input
              
              className="form-control"
              placeholder="surname"
              value={newUser.lastName}
              onChange={(e) => setNewUser({...newUser, lastName:e.target.value})}
            />
            {isSubmitted && newUser.lastName.trim() === '' && (
              <span className="text-danger">Please fill the above field</span>
            )}
          </div>
          <div className="mb-3"><label className="label">Gmail</label>
            <input
              type="email"
              className="form-control"
              placeholder="abc@gmail.com"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email:e.target.value})}
            />
            {isSubmitted && newUser.email.trim() === '' && (
              <span className="text-danger">Please fill the above field</span>
            )}
            {/* {errorMessage && <span className="text-danger">{errorMessage}</span>} */}
          </div>
          <div className="mb-3"><label className="label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="****"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password:e.target.value})}
            />
            {isSubmitted && newUser.password.trim() === '' && (
              <span className="text-danger">Please fill the above field</span>
            )}
          </div>
          <div className="mb-3"><label className="label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && (
                <span className="text-danger">{passwordError}</span>
              )}
          </div>
          {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
         
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-success btn-block d-flex align-items-center justify-content-center"
              onClick={handleLogIn}
              disabled={loading} 
            >
             {loading ? (
              <> <span
                  className="spinner-border spinner-border-sm text-light me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                    Loading...
                    </>
                     ) : (
              "SIGN IN"
            )}
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

export default CreateAccount