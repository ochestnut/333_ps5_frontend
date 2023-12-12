import axios from "axios";
import React, { useState } from 'react';

const LoginView = ({ onLogin, onError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost/index.php/user/login", {
        log_username: username,
        log_password: password
      });

      if (response.data.status === 'success') {
        console.log("User logged in successfully ", response.data.username);
        // Pass the username to the onLogin prop
        onLogin({ username: response.data.username });

      } else {
        const errorMessage = response.data.error || 'Unknown error';
        console.error(`Error logging in: ${errorMessage}`);
        onError({ errorCode: response.data.error, errorMessage: response.data.message });
      }
    } catch (error) {
      console.error("Error during request:", error);
      if (error.response) {
        // Handle errors with a response from the server
        onError({
          errorCode: error.response.status,
          errorMessage: error.response.data.error || "Unknown error",
        });
      } else {
        // Handle network errors or server unreachable
        onError({
          errorCode: -1,
          errorMessage: "Network error or server unreachable",
        });
      }
    }

  };

  return (
    <div className="login-container">
      <a href="registration.php">
        <button className="login-register-button">Register</button>
      </a>
      <h3>Login Here</h3>
      <form onSubmit={handleSubmit}>
        <div className="login-entries">
          <label htmlFor="log_username">Username</label>
          <input type="text" className="login-form-control" id="log_username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="login-entries">
          <label htmlFor="log_password">Password</label>
          <input type="password" className="login-form-control" id="log_password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-submit-button">LOGIN</button>
      </form>
    </div>
  );
}

export default LoginView;