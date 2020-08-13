import React from "react";
import { Typography, Divider, Button, TextField } from "@material-ui/core";
import axios from "axios";

export default function SimpleSelect() {
  const [Hackathon, setHackathon] = React.useState({
    Hackathon_name: "",
    Hackathon_date: "2017-05-24",
    Hackathon_definition: "",
    Hackathon_description: "",
  });
  let testCase;

  const handleChange = (e, id) => {
    if (id === "Hackathon_name") {
      setHackathon({
        Hackathon_name: e.target.value,
        Hackathon_date: Hackathon.Hackathon_date,
        Hackathon_definition: Hackathon.Hackathon_definition,
        Hackathon_description: Hackathon.Hackathon_description,
      });
    } else if (id === "Hackathon_date") {
      setHackathon({
        Hackathon_name: Hackathon.Hackathon_name,
        Hackathon_date: e.target.value,
        Hackathon_definition: Hackathon.Hackathon_definition,
        Hackathon_description: Hackathon.Hackathon_description,
      });
    } else if (id === "Hackathon_definition") {
      setHackathon({
        Hackathon_name: Hackathon.Hackathon_name,
        Hackathon_date: Hackathon.Hackathon_date,
        Hackathon_definition: e.target.value,
        Hackathon_description: Hackathon.Hackathon_description,
      });
    } else if (id === "Hackathon_description") {
      setHackathon({
        Hackathon_name: Hackathon.Hackathon_name,
        Hackathon_date: Hackathon.Hackathon_date,
        Hackathon_definition: Hackathon.Hackathon_definition,
        Hackathon_description: e.target.value,
      });
    } else {
      testCase = e.target.files[0];
      // console.log(e.target.files[0]);
    }
  };

  const handleClick = () => {
    let formdata = new FormData();
    formdata.append("Hackathon_name", Hackathon.Hackathon_name);
    formdata.append("Hackathon_date", Hackathon.Hackathon_date);
    formdata.append("Hackathon_definition", Hackathon.Hackathon_definition);
    formdata.append("Hackathon_description", Hackathon.Hackathon_description);
    formdata.append("testcases", testCase);
    axios({
      method: "post",
      url: "http://localhost:4000/admin/hackathon/posthackathon",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: formdata,
    })
      .then(function (response) {
        //handle success
        //  console.log("response", JSON.stringify(response.data));
        window.location.reload(true);
      })
      .catch(function (response) {
        alert("err", response);
      });
  };

  return (
    <div>
      <table>
        <tr>
          <td>
            <Typography>Hackathon Name:</Typography>
          </td>
          <td>
            {" "}
            <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              variant="outlined"
              onChange={(e) => {
                handleChange(e, "Hackathon_name");
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Typography>Hackathon Defination:</Typography>
          </td>
          <td>
            {" "}
            <TextField
              id="outlined-basic"
              style={{ width: "100%" }}
              variant="outlined"
              onChange={(e) => {
                handleChange(e, "Hackathon_definition");
              }}
            />
          </td>
        </tr>

        <tr>
          <td>
            <Typography>Hackathon Description:</Typography>
          </td>
          <td>
            <TextField
              id="standard-multiline-flexible"
              label="Description with rules"
              multiline
              rowsMax="4"
              variant="outlined"
              style={{ width: "100%" }}
              //   value={value}
              onChange={(e) => handleChange(e, "Hackathon_description")}
            />
          </td>
        </tr>
        <tr>
          <td>Hackathon Date</td>
          <td>
            {" "}
            <TextField
              id="date"
              type="date"
              defaultValue="2017-05-24"
              style={{ width: "100%" }}
              onChange={(e) => {
                handleChange(e, "Hackathon_date");
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Test Cases:</td>
          <td>
            <input
              type="file"
              onChange={(e) => {
                handleChange(e, "File");
              }}
              style={{ width: "100%", margin: "5px", height: "100%" }}
            />
          </td>
        </tr>
      </table>
      <Divider style={{ margin: "10px" }} />
      <Button onClick={handleClick} color="primary" style={{ margin: "10px" }}>
        Submit Hackathon
      </Button>
    </div>
  );
}
