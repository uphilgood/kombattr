import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    height: 40,
    width: 140,
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

  const getStandardTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return !!minutes ? `${minutes}:${seconds}` : `${seconds}s`;
  };

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={elevation_profile}
                title="elevation_profile"
              />
            </Hidden>
            <CardContent>
              <Typography component="h2" variant="h5">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Current KOM: {komStats.kom}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Current QOM: {komStats.qom}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Your Current PR:
                {athleteStats.pr_elapsed_time
                  ? getStandardTime(athleteStats.pr_elapsed_time)
                  : "N/A"}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Distance: {distance}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

SegmentCard.propTypes = {
  segmentData: PropTypes.object,
};

export default SegmentCard;
