import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Button, Divider } from "@material-ui/core";
import axios from "axios";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Table from "../UserComp/Table";

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

export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [Arr, setArr] = React.useState([]);
  const [Data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [isTable, setIsTable] = React.useState(false);

  const handleToggle = () => {
    setIsTable(!isTable);
  };

  const handleClick = (e, id) => {
    //console.log(id);
    setName(id);
    axios({
      method: "put",
      url: "http://localhost:4000/admin/result/giveResult/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          setData(response.data);
          setIsTable(!isTable);
        }
        console.log(response.data);
      })
      .catch(function (response) {
        // console.log(response);
        alert("error");
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/admin/result/getHackathon",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        //console.log(response.data);
        setArr(response.data);
      })
      .catch(function (response) {
        //  console.log(response);
        alert("error");
      });
  }, []);

  if (!isTable) {
    return (
      <div className={classes.root} style={{ width: "100%" }}>
        {/* <Grid item xs={12} md={6}> */}

        <div
          className={classes.demo}
          style={{ width: "100%", marginLeft: "50%" }}
        >
          <List dense={dense} style={{ width: "100%" }}>
            <ListItem style={{ width: "100%" }}>
              <Typography
                variant="overline"
                align="center"
                style={{ width: "100%", fontSize: "300%" }}

                // className={classes.title}
              >
                RESULTS
              </Typography>
            </ListItem>
            {Arr.map((arr) => {
              return (
                <ListItem style={{ width: "100%" }}>
                  <ListItemText
                    primary={arr.Hackathon_name}
                    secondary={secondary ? "Secondary text" : null}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      edge="end"
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        handleClick(e, arr.Hackathon_name);
                      }}
                    >
                      See Result
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>

        {/* </Grid> */}
      </div>
    );
  } else {
    return (
      <div className={classes.demo} style={{ width: "50%", marginLeft: "10%" }}>
        <ArrowBackIosIcon
          //style={{ marginLeft: "50%" }}
          onClick={handleToggle}
        />
        <Typography
          align="center"
          variant="h4"
          // style={{ width: "100%", fontSize: "300%" }}
        >
          {name}
        </Typography>

        <Table data={Data} />
      </div>
    );
  }
}
