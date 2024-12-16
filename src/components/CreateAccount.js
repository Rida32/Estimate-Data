
import { useNavigate } from "react-router-dom";
import React, { useState  } from "react";
import axios from 'axios';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newUser, setNewUser] = useState({})

  const isButtonEnabled = email.trim() !== '' && password.trim() !== '';
 
  const handleSignIn = async () => {
    // setIsSubmitted(true);
    // if (!email.trim() || !password.trim()) {
    //     setErrorMessage("Please fill in all fields.");
    //     return;
    //   }
  
      try {
        const response = await axios.post("http://192.168.18.35:9000/api/v2/auth/signup", newUser
        );
        console.log("test", response)
  
        // if (response.data.success) {
        //   setErrorMessage("");
        //   navigate("/login");
        // } else {
        //   setErrorMessage(response.data.message || "Error creating account. Please try again.");
        // }
      } catch (error) {
        console.error("Sign-up error:", error);
        setErrorMessage("An error occurred while creating your account. Please try again later.");
      }
    }
  
  return (
    <>
    
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ width: '400px', borderRadius: '10px' }}>
        <h5 className="text-center mb-3">Personal Information</h5>
        <p className="text-center text-muted mb-4">
          Create Your  Account
        </p>
        <form>
        <div className="mb-3">

            <input
             
              className="form-control"
              placeholder="usertype"
              value={newUser.userType}
              onChange={(e) => setNewUser({...newUser, userType:e.target.value})}
            />
            {isSubmitted && newUser.userType.trim() === '' && (
              <span className="text-danger">Please fill the above field</span>
            )}
          </div>
        <div className="mb-3">
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
          <div className="mb-3">
            <input
              
              className="form-control"
              placeholder="lastname"
              value={newUser.lastName}
              onChange={(e) => setNewUser({...newUser, lastName:e.target.value})}
            />
            {isSubmitted && newUser.lastName.trim() === '' && (
              <span className="text-danger">Please fill the above field</span>
            )}
          </div>
          <div className="mb-3">
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
          </div>
          <div className="mb-3">
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
          {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
         
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={handleSignIn}
             
            >
              SIGN IN
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