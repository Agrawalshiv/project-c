import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; 
import { useAuth } from "../../authentication";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) { 
      setError("Please enter a valid email address");
      return;
    }

    try {
      await login(email, password); 
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <div className="login-container">
      <div className="form-card"> 
        <h2>Login</h2> 
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {error && <div className="error-msg">{error}</div>} 
        </form>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div> 
    </div>
  );
};

export default Login;
