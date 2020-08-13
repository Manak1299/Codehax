import React from "react";
import AceEditor from "react-ace";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Editor(props) {
  const [code, setCode] = React.useState("print('hello world')");
  const [openTrue, setOpenTrue] = React.useState(false);
  const [openFalse, setOpenFalse] = React.useState(false);
  const [openError, setopenError] = React.useState(false);
  const [result, setResult] = React.useState({});
  let Hackathon = props.Hackathon;

  const onChange = (newValue) => {
    setCode(newValue);
  };

  const handleSubmit = () => {
    //  console.log(Hackathon);
    axios({
      method: "put",
      url: "http://localhost:4000/user/hackathon/endhackathon/" + 1,
      data: JSON.stringify({
        Hackathon_name: Hackathon.Hackathon_name,
        code: code,
        language: "python",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        //  console.log(response.data);
        window.location.reload(true);
      })
      .catch(function (response) {
        // console.log(response);
        alert("error");
      });
  };

  const handleClick = () => {
    //  console.log(code);
    axios({
      method: "post",
      url: "http://localhost:4000/user/hackathon/compile",
      data: JSON.stringify({
        Hackathon_name: Hackathon.Hackathon_name,
        code: code,
        language: "python",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          setOpenTrue(true);
          setResult(response.data);
        } else {
          // console.log(response.data);
          setResult(response.data);
          setOpenFalse(true);
        }
      })
      .catch(function (response) {
        console.log(response);
        setopenError(true);
      });
  };

  const handleCloseTrue = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenTrue(false);
  };

  const handleCloseFalse = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFalse(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setopenError(false);
  };

  const handleClear = () => {
    setCode("#type your code here");
  };

  return (
    //style={{ marginLeft: "35%", height: "50%", width: "100%" }}
    <div>
      <center>
        <Typography>{Hackathon.Hackathon_name}</Typography>
        <Typography>{Hackathon.Hackathon_definition}</Typography>

        <AceEditor
          placeholder="Placeholder Text"
          mode="python"
          theme="textmate"
          name="blah2"
          //onLoad={this.onLoad}
          height="500px"
          width="600px"
          onChange={onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "5px" }}
          onClick={handleClick}
        >
          Compile
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "5px" }}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "5px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Snackbar
          open={openTrue}
          autoHideDuration={6000}
          onClose={handleCloseTrue}
        >
          <Alert onClose={handleCloseTrue} severity="success">
            Compilation successfull
          </Alert>
        </Snackbar>
        <Snackbar
          open={openFalse}
          autoHideDuration={6000}
          onClose={handleCloseFalse}
        >
          <Alert onClose={handleCloseFalse} severity="warning">
            Test Case Didnt match, your output is {result.output} with input{" "}
            {result.input}, expected output is {result.eoutput}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            Compilation error
          </Alert>
        </Snackbar>
      </center>
    </div>
  );
}
