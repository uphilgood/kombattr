import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 70,
    width: 250,
  },
});

const SegmentCard = ({ segmentData }) => {
  const classes = useStyles();

  const {
    athleteStats,
    // climb_category,
    distance,
    elevation_profile,
    komStats,
    // mapStats,
    // starred,
    name,
  } = segmentData;

  console.log("segment data", segmentData);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <CardMedia
          className={classes.media}
          image={elevation_profile}
          title="elevation_profile"
        />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {name}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Current KOM: {komStats.kom}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Current QOM: {komStats.qom}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Your Current PR:{" "}
          {athleteStats.pr_elapsed_time ? athleteStats.pr_elapsed_time : "N/A"}
        </Typography>
        <Typography variant="body2" component="p">
          Distance: {distance}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default SegmentCard;