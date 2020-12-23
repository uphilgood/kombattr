import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Activities({ activities }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Activities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ride Time</TableCell>
            <TableCell>Average Speed</TableCell>
            <TableCell align="right">Suffer Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!activities.length &&
            activities.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.start_date_local}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.moving_time}</TableCell>
                <TableCell>{row.average_speed}</TableCell>
                <TableCell align="right">{row.suffer_score}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
