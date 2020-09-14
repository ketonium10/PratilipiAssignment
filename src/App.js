import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Stories from "./Components/Stories";
import { auth } from "./firebase";
import Header from "./Components/Header";
import Storyview from "./Components/Storyview";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();
  //a listner keeping track of the user
  useEffect(() => {
    //will run only once when the app component loads..
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/storyview">
            <Header />
            <Storyview />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Stories />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
