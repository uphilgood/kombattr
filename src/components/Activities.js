import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import { getStandardTime } from "../utlis/getStandardTime";
import { getStandardDistance } from "../utlis/getStandardDistance";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Activities({
  name,
  average_speed,
  average_watts,
  average_cadence,
  distance,
  elasped_time,
  max_speed,
  max_watts,
  moving_time,
}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={`Average Speed: ${average_speed} | Distance: ${getStandardDistance(
            distance
          )}M | Moving Time: ${getStandardTime(moving_time)} `}
        />
      </ListItem>
    </List>
  );
}
