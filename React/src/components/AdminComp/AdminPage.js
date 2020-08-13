import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle, DialogContent } from "@material-ui/core";
import PostHackathon from "./PostHackathon";

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
  paper: {
    height: 140,
    width: 100,
  },
  // control: {
  //   padding: theme.spacing(2)
  // }
});

export default function AdminPage() {
  const classes = useStyles();
  const [hlist, setHlist] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [cHack, setcHack] = React.useState({
    Hackathon_name: "",
    Hackathon_date: "",
    Hackathon_definition: "",
    Hackathon_description: "",
  });
  const [isAdd, setisAdd] = React.useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/admin/hackathon/hackathonlist",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        //handle success
        //  console.log("hlist", JSON.stringify(response.data));
        setHlist(response.data);
      })
      .catch(function (response) {
        //handle error
        alert("err", response);
      });
  }, []);

  const handleClick = (e, value) => {
    setcHack({
      Hackathon_name: value.Hackathon_name,
      Hackathon_date: value.Hackathon_date,
      Hackathon_definition: value.Hackathon_definition,
      Hackathon_description: value.Hackathon_description,
    });
    //  console.log(cHack);
    setisAdd(false);
    setOpen(true);
  };

  const handleDelete = (e, Hackathon_name) => {
    axios({
      method: "get",
      url:
        "http://localhost:4000/admin/hackathon/deletehackathon/" +
        Hackathon_name,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        //handle success
        window.location.reload(true);
        //  console.log("hlist", JSON.stringify(response.data));
      })
      .catch(function (response) {
        //handle error
        alert("err", response);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(true);
    setisAdd(true);
  };

  return (
    <div style={{ width: "100%" }}>
      <Button color="primary" style={{ margin: "20px" }} onClick={handleAdd}>
        + ADD Hackathon
      </Button>
      <Grid
        style={{ width: "100%" }}
        container
        className={classes.root}
        spacing={2}
      >
        <Grid style={{ width: "100%" }} item xs={12}>
          <Grid
            style={{ width: "100%" }}
            container
            justify="center"
            spacing={2}
          >
            {hlist.map((value) => (
              <Card
                className={classes.root}
                style={{ width: "25%", padding: "10px", margin: "10px" }}
              >
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Challenge of the Day
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {value.Hackathon_name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {value.Hackathon_date.split("T")[0]}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {value.Hackathon_definition}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={(e) => handleClick(e, value)} size="small">
                    View
                  </Button>
                  <Button
                    onClick={(e) => handleDelete(e, value.Hackathon_name)}
                    size="small"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        {isAdd ? (
          <div>
            {" "}
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <Typography variant="h4">ADD Hackathon</Typography>
            </DialogTitle>
            <DialogContent dividers>
              <PostHackathon />
            </DialogContent>
          </div>
        ) : (
          <div>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <Typography variant="h3"> {cHack.Hackathon_name}</Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="h6" gutterBottom>
                Defination
              </Typography>
              <Typography gutterBottom>{cHack.Hackathon_definition}</Typography>
              <Typography variant="h6" gutterBottom>
                Date
              </Typography>
              <Typography gutterBottom>{cHack.Hackathon_date}</Typography>
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <Typography gutterBottom>
                {cHack.Hackathon_description}lorem ifsukjdsgggggggggggg aufHook
                useEffect has a missing depenHook useEffect has a missing
                depenHook useEffect has a missing depen
              </Typography>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </div>
  );
}
