import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
// import { userContext } from "./context/userContext";

const clientId = "55628";
const clientSecret = "c3349b19eb90b2c7874bca605b0d90e1552ff318";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const clickHandler = () => {
  window.location.replace(
    `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/dashboard/exchange_token&approval_prompt=force&scope=activity:read_all`
  );
};

const Home = ({ setAccessCode, accessCode }) => {
  // const user = useContext(userContext);
  const classes = useStyles();
  // const windowLocation = document.location.href;

  // useEffect(() => {
  //   const myUrl = new URL(windowLocation);
  //   console.log("my url", myUrl);
  //   myUrl.searchParams.forEach((val, key) => {
  //     if (key === "code") {
  //       const authCall = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${val}&grant_type=authorization_code`;
  //       fetch(authCall, {
  //         method: "POST",
  //       })
  //         .then((res) => res.json())
  //         .then((res) => setAccessCode(res.access_token));
  //     }
  //   });
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to KOMbattr. Where you try and combat the toughest KOMs in
          your area!
        </p>
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={clickHandler}>
            Sign in with Strava
          </Button>
        </div>
      </header>
    </div>
  );
};

const Main = () => {};

const App = () => {
  const [accessCode, setAccessCode] = useState("");

  console.log("access token", accessCode);
  return (
    // <userContext.Provider value={{ accessCode, setAccessCode }}>
    <Router>
      {/* <Switch> */}
      <Route
        exact
        path="/"
        component={() => (
          <Home accessCode={accessCode} setAccessCode={setAccessCode} />
        )}
      />

      <Route
        path="/dashboard"
        component={() => <Dashboard accessCode={accessCode} />}
      />

      {/* </Switch> */}
    </Router>
    // </userContext.Provider>
  );
};

export default App;
