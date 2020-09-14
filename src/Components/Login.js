import React, { useState } from "react";
import "../CSS/Login.css";
import { useHistory } from "react-router-dom";
import { db, auth } from "../firebase";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = e => {
    var user = username + "@gmail.com"; //to use firebase authentication
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(user, password)
      .then(auth => {
        //if auth exists then go to home page
        if (auth) {
          history.push("/");
        }
      })
      .catch(error => alert(error.message));
  };
  const register = e => {
    var user = username + "@gmail.com"; //to use firebase authentication
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(user, password)
      .then(auth => {
        //if auth exists then go to home page
        if (auth) {
          db.collection("users")
            .doc(auth.user.uid)
            .set({
              userId: auth.user.email.substr(0, auth.user.email.indexOf("@")),
              storiesViewed: []
            })
            .then(() => {
              console.log("done");
            });
          history.push("/");
        }
        //successfully made a user with respective email and password
      })
      .catch(error => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>UserName</h5>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={signIn} className="login__signInButton">
            Sign In
          </button>
        </form>

        <button onClick={register} className="login__registerButton">
          Create Your Account
        </button>
      </div>
    </div>
  );
}

export default Login;
