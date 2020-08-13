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
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Comp from "../Comp";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
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

export default function UpcomingHack() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hlist, setHlist] = React.useState([]);
  const [togglePage, setTogglePage] = React.useState(false);
  const [cHack, setcHack] = React.useState({
    Hackathon_name: "",
    Hackathon_date: "",
    Hackathon_definition: "",
    Hackathon_description: "",
  });

  const handleCompiler = () => {
    axios({
      method: "post",
      url: "http://localhost:4000/user/hackathon/starthackathon",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: { Hackathon_name: cHack.Hackathon_name },
    })
      .then(function (response) {
        //handle success
        // console.log("hlist", JSON.stringify(response.data));
      })
      .catch(function (response) {
        //handle error
        alert("err", response);
      });
    setTogglePage(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e, value) => {
    setcHack({
      Hackathon_name: value.Hackathon_name,
      Hackathon_date: value.Hackathon_date,
      Hackathon_definition: value.Hackathon_definition,
      Hackathon_description: value.Hackathon_description,
    });
    // console.log(cHack);
    setOpen(true);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/user/hackathon/upcominghackathons",
      headers: { "Content-Type": "application/json" },
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

  if (togglePage) {
    return <Comp role={"User"} value={15} Hackathon={cHack} />;
  } else {
    return (
      <div style={{ width: "100%" }}>
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
                  style={{
                    width: "20%",
                    padding: "10px",
                    margin: "10px",
                  }}
                  elevation={3}
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
                      Date:{" " + value.Hackathon_date.split("T")[0]}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Defination:{" " + value.Hackathon_definition}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      end="center"
                      onClick={(e) => handleClick(e, value)}
                    >
                      View Hackathon
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/* dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
        >
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
            <Typography gutterBottom>{cHack.Hackathon_description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              autoFocus
              onClick={handleCompiler}
              color="primary"
            >
              Start Hackathon
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
