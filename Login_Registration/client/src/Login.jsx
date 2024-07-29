import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Login = () => {
    
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {email, password})
    .then(result => {
        if (result.data === "Success") {
            navigate('/home');
        } else {
            setErrorMessage(result.data); //Display the error message from the server
        }
     })
    .catch(err => {
        console.log(err);
        setErrorMessage("Your email and/or password are incorrect."); //Display a general message
    });
    
};

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className="bg-white p-3 rounded w-25">
    <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            
    <div className="mb-3">
    <label htmlFor="email">
        <strong>Email</strong>
    </label>
    <input
    type="email"
    placeholder="Enter Email"
    autoComplete="off"
    name="email"
    className="form-control rounded-0"
    onChange={(e) => setEmail(e.target.value)}
    />
    </div>

     <div className="mb-3">
    <label htmlFor="password">
        <strong>Password</strong>
    </label>
    <input
    type="password"
    placeholder="Enter Password"
    autoComplete="off"
    name="password"
    className="form-control rounded-0"
    onChange={(e) => setPassword(e.target.value)}
    />
     </div>

     {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

     <button type="submit" className="btn btn-success w-100 rounded-0">
        Login
        </button>
    </form>
    </div>
   </div>
  )
}

export default Login;