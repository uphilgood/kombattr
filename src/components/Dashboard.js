import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Activities from "./Activities";
import { mainListItems, secondaryListItems } from "./listItems";
import useGeoLocation from "../utlis/useGeoLocation";
import SegmentCard from "./SegmentCard";

import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Divider from "@material-ui/core/Divider";
// import post1 from "./blog-post.1.md";
// import post2 from "./blog-post.2.md";
// import post3 from "./blog-post.3.md";

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
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  mainMapContainer: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  cardTheme: {
    padding: theme.spacing(3, 0),
  },
}));

const sections = [
  { title: "My KOMs", url: "#" },
  { title: "My Activies", url: "#" },
];

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
];

const posts = [];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    {
      name: "GitHub",
      icon: GitHubIcon,
      onClick: () => window.open("https://github.com/uphilgood"),
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      onClick: () => window.open("https://www.facebook.com/philip.lee.7568"),
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      onClick: () => window.open("https://twitter.com/JourneyToCode1"),
    },
  ],
};

export default function Dashboard({ acessToken }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [authCode, setAuthCode] = useState("");
  const [toggleLogin, setToggleLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [segmentData, setSegmentData] = useState([]);
  const [athleteInfo, setAthleteInfo] = useState("");
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const location = useGeoLocation();

  const clickHandler = () => {
    window.location.replace(
      `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${process.env.REACT_APP_HOST}/dashboard/exchange_token&approval_prompt=force&scope=activity:read_all`
    );
  };

  const getActivities = useCallback((access) => {
    const callActivities = `https://www.strava.com/api/v3/athlete/activities?per_page=10&access_token=`;
    fetch(callActivities + access)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const authCall = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${authCode}&grant_type=authorization_code`;

    const getAuth = async () => {
      const auth = await fetch(authCall, {
        method: "POST",
      });

      const authData = await auth.json();

      setAthleteInfo(
        `${authData?.athlete?.firstname} ${authData?.athlete?.lastname}`
      );

      if (authData.errors?.length) {
        setAuthCode("");
        setToggleLogin(true);
      } else {
        const refreshToken = authData.refresh_token;
        const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
        const getCallRefresh = await fetch(callRefresh, {
          method: "POST",
        });
        const callRefreshData = await getCallRefresh.json();
        setAccessToken(callRefreshData.access_token);
        getActivities(callRefreshData.access_token);
      }
    };

    if (!!authCode) {
      getAuth();
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
  }, [authCode, clientId, clientSecret, getActivities, toggleLogin]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const MyComponent = () => {
    const map = useMapEvents({
      click: async () => {
        if (authCode) {
          const bounds = map.getBounds();
          console.log("location found:", bounds);
          const mapBounds = [
            bounds._southWest.lat,
            bounds._southWest.lng,
            bounds._northEast.lat,
            bounds._northEast.lng,
          ];
          const callSegments = `https://www.strava.com/api/v3/segments/explore?bounds=${mapBounds}&activity_type=riding&access_token=`;
          const segments = await fetch(callSegments + accessToken);

          const segmentData = await segments.json();

          const listOfSegments = segmentData.segments;

          console.log("all segs ", listOfSegments);

          for (var i = 0; i < listOfSegments.length; i++) {
            const segmentEfforts = `https://www.strava.com/api/v3/segment_efforts?segment_id=${listOfSegments[i].id}&access_token=`;
            const segmentEffortsCall = await fetch(
              segmentEfforts + accessToken
            );
            const segmentEffortData = await segmentEffortsCall.json();

            const getSegmentEfforts = `https://www.strava.com/api/v3/segments/${listOfSegments[i].id}?access_token=`;
            const getSegmentEffortsCall = await fetch(
              getSegmentEfforts + accessToken
            );
            const getSegmentEffortData = await getSegmentEffortsCall.json();
            const athleteStats = getSegmentEffortData.athlete_segment_stats;
            const komStats = getSegmentEffortData.xoms;
            const mapStats = getSegmentEffortData.map;

            listOfSegments[i] = {
              ...listOfSegments[i],
              ...segmentEffortData[0],
              athleteStats,
              komStats,
              mapStats,
            };
          }
          setSegmentData(listOfSegments);
        }
      },
    });
    return null;
  };

  console.log("actiites", activities);
  //   const CircleBoundary = () => {
  //     const circleRef = useRef();

  //     useEffect(() => {
  //       const radius = circleRef.current.getRadius();
  //       console.log("radius bounds", circleRef.current.getBounds());
  //     }, []);

  //     return <Circle ref={circleRef} center={center} radius={1000} />;
  //   };
  //   console.log("bounds ", this.refs.map.leafletElement.getBounds);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="KOMBattr"
          sections={sections}
          clickHandler={clickHandler}
          authCode={authCode}
          athlete={athleteInfo}
        />
        <main>
          {/* <Paper className={classes.mainMapContainer}> */}
          <MapContainer
            className={classes.mainMapContainer}
            center={[38.83388, -77.43038]}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent />
            {/* <CircleBoundary /> */}
            {location.loaded && !location.errors && (
              <Marker position={[38.83388, -77.43038]}></Marker>
            )}
          </MapContainer>
          {/* </Paper> */}

          {segmentData.length === 0 && (
            <>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
              >{`Login, Scroll and Zoom around the map! Then click on a spot to see nearby Segments!`}</Typography>
              <Divider />
            </>
          )}

          <Grid container spacing={5} className={classes.mainGrid}>
            {/* <Main title="From the firehose" posts={posts} /> */}
            <Grid container xs={12} md={8} spacing={4}>
              {!!segmentData.length &&
                segmentData.map((seg) => (
                  <SegmentCard
                    // className={classes.cardTheme}
                    segmentData={seg}
                  />
                ))}
            </Grid>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
              activities={activities}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Kombattr" description="Battle those KOMs!" />
    </React.Fragment>
    // <div className={classes.root}>
    //   <CssBaseline />
    //   <AppBar
    //     position="absolute"
    //     className={clsx(classes.appBar, open && classes.appBarShift)}
    //   >
    //     <Toolbar className={classes.toolbar}>
    //       <IconButton
    //         edge="start"
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={handleDrawerOpen}
    //         className={clsx(
    //           classes.menuButton,
    //           open && classes.menuButtonHidden
    //         )}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography
    //         component="h1"
    //         variant="h6"
    //         color="inherit"
    //         noWrap
    //         className={classes.title}
    //       >
    //         Dashboard
    //       </Typography>
    //       {!authCode && (
    //         <Button variant="contained" color="primary" onClick={clickHandler}>
    //           Login VIa Strava
    //         </Button>
    //       )}
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer
    //     variant="permanent"
    //     classes={{
    //       paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
    //     }}
    //     open={open}
    //   >
    //     <div className={classes.toolbarIcon}>
    //       <IconButton onClick={handleDrawerClose}>
    //         <ChevronLeftIcon />
    //       </IconButton>
    //     </div>
    //     <Divider />
    //     <List>{mainListItems}</List>
    //     <Divider />
    //     <List>{secondaryListItems}</List>
    //   </Drawer>
    //   <main className={classes.content}>
    //     <div className={classes.appBarSpacer} />

    //     <MapContainer center={[38.83388, -77.43038]} zoom={13}>
    //       <TileLayer
    //         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //       />
    //       <MyComponent />
    //       {/* <CircleBoundary /> */}
    //       {location.loaded && !location.errors && (
    //         <Marker position={[38.83388, -77.43038]}></Marker>
    //       )}
    //     </MapContainer>

    //     <Container maxWidth="lg" className={classes.container}>
    //       <div style={{ display: "flex", flexWrap: "wrap" }}>
    //         {!!segmentData.length &&
    //           segmentData.map((seg) => <SegmentCard segmentData={seg} />)}
    //       </div>
    //     </Container>

    //     <Container maxWidth="lg" className={classes.container}>
    //       <Grid container spacing={3}>
    //         <Grid item xs={12}>
    //           <Paper className={classes.paper}>
    //             <Activities activities={activities} />
    //           </Paper>
    //         </Grid>
    //       </Grid>
    //       <Box pt={4}>
    //         <Copyright />
    //       </Box>
    //     </Container>
    //   </main>
    // </div>
  );
}
