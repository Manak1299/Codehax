import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
} from "@material-ui/core";
import axios from "axios";

function HelpUser() {
  const [postmsg, setPost] = React.useState("");
  const [prevMsg, setPrevMsg] = React.useState([]);
  const handleChange = (e) => {
    console.log(e.target.value);
    setPost(e.target.value);
  };

  const handleSubmit = () => {
    //console.log("click");
    axios({
      method: "post",
      url: "http://localhost:4000/user/help/postQuestion",
      data: { message: postmsg },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
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
      url: "http://localhost:4000/user/help/getPosts",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        //console.log(response.data);
        setPrevMsg(response.data);
      })
      .catch(function (response) {
        // console.log(response);
        alert("error");
      });
  });

  return (
    <div style={{ width: "100%" }}>
      <Grid item xs={12}>
        <Paper style={{ width: "100%" }}>
          <Typography variant="h4" style={{ margin: "1%" }}>
            Post a problem
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows="3"
            variant="outlined"
            style={{ width: "95%", marginLeft: "1%" }}
            onChange={handleChange}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ margin: "1%" }}
          >
            Post
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "10px" }}>
        <div style={{ width: "100%" }}>
          {prevMsg.map((arr) => {
            return (
              <Paper style={{ width: "100%", margin: "5px" }}>
                <div style={{ margin: "5px" }}>
                  {arr.isSolved ? (
                    <Typography>Problem is solved</Typography>
                  ) : (
                    <Typography>
                      Your problem will be answered shortly
                    </Typography>
                  )}
                  <Divider />
                  <Typography align="center">
                    Posted Problem:{" " + arr.message}
                  </Typography>
                  <Typography align="center">
                    Posted on: {" " + arr.post_date}
                  </Typography>
                  {arr.isSolved && (
                    <div>
                      <Typography align="center">
                        Solution:{arr.answer}
                      </Typography>
                      <Typography align="center">{arr.solve_date}</Typography>
                    </div>
                  )}
                </div>
              </Paper>
            );
          })}
        </div>
      </Grid>
    </div>
  );
}

export default HelpUser;
