import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler(e) {
    e.preventDefault();
    const userData = { username, email, fullname, password };

    axios
      .post('http://localhost:8000/users', userData)
      .then((res) => console.log('Data received:', res))
      .catch((err) => console.error('Error submitting data:', err));
  }

  return (
    <div>                                                                                                  
      <h1 className="text-red-700">Signup</h1>
      <form method="post" onSubmit={submitHandler}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            name="username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Fullname</label>
          <input
            type="text"
            value={fullname}
            name="fullname"
            placeholder="Enter your fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Home;
