import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function Result() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [Arr, setArr] = React.useState([1, 2, 3]);
  useEffect(() => {});
  return (
    <div className={classes.root} style={{ width: "100%" }}>
      {/* <Grid item xs={12} md={6}> */}
      <Typography
        variant="h4"
        style={{ marginLeft: "60%" }}
        className={classes.title}
      >
        Result
      </Typography>
      <div
        className={classes.demo}
        style={{ width: "100%", marginLeft: "35%" }}
      >
        <List dense={dense} style={{ width: "100%" }}>
          {Arr.map((arr) => {
            return (
              <ListItem style={{ width: "100%" }}>
                <ListItemText
                  primary={"arr.Hackathon_name"}
                  secondary={secondary ? "Secondary text" : null}
                />
                <ListItemSecondaryAction edge="end">
                  ABCD
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
      {/* </Grid> */}
    </div>
  );
}

export default Result;
