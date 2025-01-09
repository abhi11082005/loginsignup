import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000";

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/signup`, formData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem("token", res.data.token);
      setMessage(res.data.message);
      navigate("/welcome");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <Link to="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
};

const Welcome = () => <h2>Welcome! You are logged in.</h2>;

const App = () => (
  <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  </Router>
);

export default App;






















// import { useEffect, useState } from 'react'
// import axios from "axios"
// import './App.css'
// import Home from "./components/Home"
// import User from "./components/User"
// import {BrowserRouter,Routes,Route} from "react-router-dom"

// function App() {
//     return (
//         <BrowserRouter>
//           <Routes>
//             <Route path='/' element={<Home/>} ></Route>
//             <Route path='/users' element={<User/>} ></Route>

//           </Routes>
//         </BrowserRouter>
//         )
// }

// export default App
