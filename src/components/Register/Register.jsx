import React, { useState } from "react";
import "./Register.css"; // Importing CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await register(name, email, password, address);
      navigate("/");
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  };

  return (
    <div className="background">
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      {error && <div className="error-msg">{error}</div>}
      <div className="login-link">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
