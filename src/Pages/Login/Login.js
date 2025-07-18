import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user, errors, loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Redirection après connexion selon le rôle
  useEffect(() => {
    if (token && user) {
      if (user.role === "admin") {
        navigate("/admin-panel");
      } else {
        navigate("/dashboard");
      }
    }
  }, [token, user, navigate]);

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {Array.isArray(errors) ? (
          errors.map((el, i) => (
            <p key={i} style={{ color: "red" }}>{el.msg}</p>
          ))
        ) : errors ? (
          <p style={{ color: "red" }}>{errors}</p>
        ) : null}

      </form>
    </div>
  );
};

export default Login;
