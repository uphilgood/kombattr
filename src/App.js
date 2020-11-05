import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Home = ({ setAccessCode, accessCode }) => {
  // const user = useContext(userContext);
  let history = useHistory();
  const classes = useStyles();

  const clickHandler = () => {
    history.push("/dashboard");
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to KOMbattr. Where you try and combat the toughest KOMs in
          your area!
        </p>
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={clickHandler}>
            Dashboard
          </Button>
        </div>
      </header>
    </div>
  );
};

const Main = () => {};

const App = () => {
  return (
    // <userContext.Provider value={{ accessCode, setAccessCode }}>
    <Router>
      {/* <Switch> */}
      <Route exact path="/" component={() => <Home />} />

      <Route path="/dashboard" component={() => <Dashboard />} />

      {/* </Switch> */}
    </Router>
    // </userContext.Provider>
  );
};

export default App;
