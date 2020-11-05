import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
// import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Activities from "./Activities";
import { mainListItems, secondaryListItems } from "./listItems";
import { map } from "leaflet";
import useGeoLocation, { location } from "../utlis/useGeoLocation";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard({ acessToken }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [activities, setActivities] = useState([]);
  const [authCode, setAuthCode] = useState("");
  const [toggleLogin, setToggleLogin] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const location = useGeoLocation();

  const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

  const clickHandler = () => {
    window.location.replace(
      `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/dashboard/exchange_token&approval_prompt=force&scope=activity:read_all`
    );
  };

  console.log("location ", location);

  const getActivities = (access) => {
    // console.log(callActivities + access)
    fetch(callActivities + access)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((e) => console.log(e));
  };

  const authCall = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${authCode}&grant_type=authorization_code`;

  useEffect(() => {
    if (!!authCode) {
      fetch(authCall, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("results", result);
          if (result.errors?.length) {
            setAuthCode("");
            setToggleLogin(true);
          } else {
            const refresh_token = result.refresh_token;
            console.log("result from refresh ", result);
            const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refresh_token}&grant_type=refresh_token`;
            fetch(callRefresh, {
              method: "POST",
            })
              .then((res) => res.json())
              .then((result) => getActivities(result.access_token));
          }

          //   getActivities(access_token);
        });
    } else {
      if (!toggleLogin) {
        const myUrl = new URL(document.location.href);
        myUrl.searchParams.forEach((val, key) => {
          if (key === "code") {
            setAuthCode(val);
          }
        });
      }
    }
  }, [authCode, toggleLogin]);

  //   useEffect(() => {
  //     const myUrl = new URL(document.location.href);
  //     myUrl.searchParams.forEach((val, key) => {
  //       if (key === "code") {
  //         const authCall = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${val}&grant_type=authorization_code`;
  //         fetch(authCall, {
  //           method: "POST",
  //         })
  //           .then((res) => res.json())
  //           .then((result) => {
  //             const access_token = result.access_token;
  //             getActivities(access_token);
  //           });
  //       }
  //     });
  //   }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  console.log("auth code", authCode);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          {!authCode && (
            <Button variant="contained" color="primary" onClick={clickHandler}>
              Login VIa Strava
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <MapContainer center={[38.83388, -77.43038]} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {location.loaded && !location.errors && (
            <Marker
              position={[location.coordinates.lat, location.coordinates.lng]}
            ></Marker>
          )}
        </MapContainer>

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid> */}
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Activities activities={activities} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
