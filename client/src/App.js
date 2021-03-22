import React, { useState, useEffect } from "react";
import "./App.css";
import Login from './pages/Login/login'
import Axios from "axios";

function App() {
  
  return (

  <div className="App">
    <Login/>
  </div>
  

  
  )

}

export default App;
/*
function App() {
  const [usernameReg, setnameUserReg] = useState("");
  const [useremailReg, setEmailReg] = useState("");
  const [userpasswordReg, setPasswordReg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  const register = () => {
    Axios.post("http://localhost:4001/signup", {
      name: usernameReg,
      email: useremailReg,
      password: userpasswordReg,
    })
      .then((result) => {
        alert("Successfully registered user");
      })
      .catch((err) => {
        alert("error");
      });
  };

  const login = () => {
    Axios.post("http://localhost:4001/login", {
      email: email,
      password: password,
    })
      .then((result) => {
        console.log(result.data.auth);
        if (!result.data.auth){
          setLoginStatus(false)
        }
        else{
          localStorage.setItem("token", result.data.token)
          setLoginStatus(true)
        }
      })
      .catch((err) => {
        alert("error");
      });
  };

  const UserAuthenticated = () => {
    Axios.get("http://localhost:4001/isUserAuth", {
      headers:{
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((result) => {
        console.log(result)

      })
      .catch((err) => {
        alert(err);
      });
  };


  return (
    <div>
      <div className="register">
        <h1>Sistema de logueo</h1>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            onChange={(e) => {
              setnameUserReg(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
        </div>
        <button onClick={register}>Submit</button>
      </div>

      <div className="login">
        <h1>Sistema de logueo</h1>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={login}>Submit</button>
      </div>

      <h1>{loginStatus}</h1>

      {loginStatus && <button onClick={UserAuthenticated}>Hi</button>}


    </div>
  );
}

export default App;
*/