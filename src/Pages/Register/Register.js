import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form)).then((res) => {
      if (!res.error) navigate("/dashboard");
    });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
