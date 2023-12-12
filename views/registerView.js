import axios from "axios";
import React, { useState } from 'react';

const RegisterView = ({ onRegister, onError }) => {  // <-- Accept the onRegister and onError props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setCPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await axios.post("http://localhost/index.php/user/create", {
        reg_username: username,
        reg_password: password,
        c_password: c_password
      });

      if (response.data.status === 'success') {
        console.log("User added successfully", response.data.username);
        onRegister({ username: response.data.username }); // <-- Call onRegister prop with user details
      } else {
        const errorMessage = response.data.error || 'Unknown error';
        console.error(`Error registering: ${errorMessage}`);
        onError({ errorCode: response.status, errorMessage });
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
    <div className="register-container">
      <h3>Register Here</h3>
      <form onSubmit={handleSubmit}>
        <div className="register-entries">
          <label htmlFor="reg_username">Username</label>
          <input type="text" className="register-form-control" id="reg_username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="register-entries">
          <label htmlFor="reg_password">Password</label>
          <input type="password" className="register-form-control" id="reg_password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="register-entries">
          <label htmlFor="c_password">Confirm Password</label>
          <input type="password" className="register-form-control" id="c_password" value={c_password} onChange={e => setCPassword(e.target.value)} />
        </div>
        <button type="submit" className="register-submit_button">REGISTER</button>
      </form>
    </div>
  );

}

export default RegisterView;