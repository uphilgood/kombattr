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
import StarRateIcon from "@material-ui/icons/StarRate";
import { getStandardTime } from "../utlis/getStandardTime";

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
    kom_rank,
    // mapStats,
    // starred,
    name,
  } = segmentData;

  console.log("segment data", segmentData);

  const stats = [
    { type: "Current KOM", value: komStats.kom },
    { type: "Current QOM", value: komStats.qom },
    {
      type: "Current PR",
      value: athleteStats.pr_elapsed_time
        ? getStandardTime(athleteStats.pr_elapsed_time)
        : "N/A",
    },
    { type: "Distance", value: distance },
  ];

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
              {kom_rank && (
                <div style={{ display: "flex" }}>
                  <StarRateIcon />
                  <Typography component="h3" variant="h8">
                    You are currently ranked {kom_rank} in the all time
                    standings!
                  </Typography>
                </div>
              )}
              {stats.map((stat) => (
                <Typography variant="subtitle1" color="textSecondary">
                  {stat.type}: {stat.value}
                </Typography>
              ))}
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
