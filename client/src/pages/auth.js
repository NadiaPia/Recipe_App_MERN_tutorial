import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';




function Auth() {
  return (
    <div classame="auth">
      <Login />
      <Register />

    </div>
  )
}

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");  

  const onSubmit = async (event) => {
    event.preventDefault(); //prevent refresh the page after the submit the form

    try {
      await axios.post("http://localhost:3001/auth/register", {
        username, 
        password
      });
      alert("Registartion Completed! Now Login")

    } catch (err) {
      console.error(err)
    }
     
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["accessS_token"]) //we define the name our Cookie as "accessS_token", othewise it'll rerender after changing the any info in the cookies
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault(); //prevent refresh the page after the submit the form

    try {
      const response = await axios.post ("http://localhost:3001/auth/login", {username, password});
      console.log("RESULT!!!!", response.data);
      setCookies("accessS_token", response.data.token);
      window.localStorage.setItem("userIDD", response.data.userId); //to store user Id somewhwre and have an access to it
      navigate("/")

    } catch (err) {
      console.error(err)
    }

  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}

    />
  )

};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2> {label} </h2>

        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => { setUsername(event.target.value) }} />
        </div>

        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => { setPassword(event.target.value) }} />
        </div>

        <button type="submit"> {label} </button>

      </form>
    </div>
  )

}

export default Auth
