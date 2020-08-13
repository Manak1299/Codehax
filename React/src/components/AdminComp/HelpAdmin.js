import React, { useEffect } from "react";
import { Typography, TextField, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function HelpAdmin() {
  const [data, setData] = React.useState([]);
  const [post, setPost] = React.useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    // console.log(e.target.value);
    setPost(e.target.value);
  };

  const handleClick = (e, Id) => {
    // console.log(Id);
    axios({
      method: "put",
      url: "http://localhost:4000/admin/help/solvemsg/" + Id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: { answer: post },
    })
      .then(function (response) {
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
      url: "http://localhost:4000/admin/help/getmsg",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        //  console.log(response.data);
        setData(response.data);
      })
      .catch(function (response) {
        // console.log(response);
        alert("error");
      });
  }, []);

  return (
    <div>
      {data.map((data) => {
        return (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Problem: {data.message + " "}
              </Typography>
              <Typography className={classes.heading}>
                Posted on: {data.post_date}
              </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows="3"
                variant="outlined"
                style={{ width: "100%", marginLeft: "1%" }}
                onChange={handleChange}
              />
            </ExpansionPanelDetails>
            <ExpansionPanelDetails>
              <Button
                onClick={(e) => handleClick(e, data._id)}
                variant="contained"
                color="primary"
                style={{
                  marginRight: "1%",
                  marginBottom: "1%",
                  marginLeft: "1%",
                }}
              >
                Post
              </Button>{" "}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

export default HelpAdmin;
