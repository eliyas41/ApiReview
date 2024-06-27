import React, { useState } from "react";
import axios from "../api/apiConfig";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState('');
  console.log(emailAddress);
  const [password, setPassword] = useState('')
  console.log(password);

  return (
    <center>
      <h1>Login</h1>
      <form action="">
        <label htmlFor="Email">Email:</label><br />
        <input type="email" name="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} /> <br /> <br />

        <label htmlFor="password">Password:</label><br />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /> <br />

        <button type="submit">Login</button>
      </form>
    </center>
  )
}

export default Login;