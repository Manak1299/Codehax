import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { TextField, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UpdateIcon from "@material-ui/icons/Update";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel(props) {
  let role = props.role;
  const classes = useStyles();
  const [profile, setProfile] = React.useState({
    Role: "",
    Userid: "",
    Email: "",
    Name: "",
  });
  const [UpdateDetails, setUpdateDetails] = React.useState(false);
  const [OldPassword, setOldPassword] = React.useState("");
  const [NewPassword, setNewPassword] = React.useState("");

  useEffect(() => {
    axios({
      method: "get",
      url:
        role === "User"
          ? "http://localhost:4000/user/profile/getdetails"
          : "http://localhost:4000/admin/profile/getdetails",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        console.log(response.data);
        setProfile({
          Role: response.data.Role,
          Userid: response.data.Userid,
          Email: response.data.Email,
          Name: response.data.Name,
        });
      })
      .catch(function (response) {
        alert("error", response);
      });
  }, []);

  const handleUpdate = () => {
    axios({
      method: "put",
      url:
        role === "User"
          ? "http://localhost:4000/user/profile/updatedetails"
          : "http://localhost:4000/admin/profile/updatedetails",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: profile,
    })
      .then(function (response) {
        console.log(response.data, response.data.Name);
        setProfile(response.data);
      })
      .catch(function (response) {
        alert("error", response);
      });
  };

  const handleChange = (e, id) => {
    console.log(profile);
    if (id === "OldPassword") {
      setOldPassword(e.target.value);
    } else if (id === "NewPassword") {
      setNewPassword(e.target.value);
    } else if (id === "Name") {
      setProfile({
        Role: profile.Role,
        Name: e.target.value,
        Email: profile.Email,
        Userid: profile.Userid,
      });
    } else if (id === "Email") {
      setProfile({
        Role: profile.Role,
        Name: profile.Name,
        Email: e.target.value,
        Userid: profile.Userid,
      });
    }
  };

  const handlePasswordChange = () => {
    axios({
      method: "put",
      url: "http://localhost:4000/auth/changepassword",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: { oldPassword: OldPassword, Password: NewPassword },
    })
      .then(function (response) {
        console.log(response.data);
        localStorage.removeItem("token");
        window.location.reload();
      })
      .catch(function (response) {
        alert("error", response.data);
      });
  };

  const handleUpdateToggle = () => {
    setUpdateDetails(!UpdateDetails);
  };

  const handleDelete = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/auth/deleteuser",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (response) {
        console.log(response.data);
        localStorage.removeItem("token");
        window.location.reload();
      })
      .catch(function (response) {
        alert("error", response.data);
      });
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            View and Update Profile{" "}
          </Typography>
        </ExpansionPanelSummary>
        <Button onClick={handleUpdateToggle} style={{ color: "#3f51b5" }}>
          {UpdateDetails ? <VisibilityIcon /> : <UpdateIcon />}
        </Button>
        <ExpansionPanelDetails>
          <table>
            <tr>
              <td>
                <Typography>Role:</Typography>
              </td>
              <td>
                <Typography>{profile.Role}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography>Name:</Typography>
              </td>
              <td>
                {UpdateDetails ? (
                  <TextField
                    id="name"
                    //   value={profile.Name}
                    onChange={(e) => {
                      handleChange(e, "Name");
                    }}
                  ></TextField>
                ) : (
                  <Typography>{profile.Name}</Typography>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <Typography>User Name:&nbsp;&nbsp;&nbsp;</Typography>
              </td>
              <td>{profile.Userid}</td>
            </tr>
            <tr>
              <td>
                <Typography>Email:</Typography>
              </td>
              <td>
                {UpdateDetails ? (
                  <TextField
                    id="name"
                    // value={profile.Email}
                    onChange={(e) => {
                      handleChange(e, "Email");
                    }}
                  ></TextField>
                ) : (
                  <Typography>{profile.Email}</Typography>
                )}
              </td>
            </tr>
            <tr>
              <Button onClick={handleUpdate} style={{ color: "#3f51b5" }}>
                Submit
              </Button>
            </tr>
          </table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Change Password</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <table>
            <tr>
              <td>
                <Typography>Old Password:</Typography>
              </td>
              <td>
                {" "}
                <TextField
                  id="password"
                  onChange={(e) => {
                    handleChange(e, "OldPassword");
                  }}
                ></TextField>
              </td>
            </tr>
            <tr>
              <td>
                <Typography>New Password:</Typography>
              </td>
              <td>
                {" "}
                <TextField
                  id="password"
                  onChange={(e) => {
                    handleChange(e, "NewPassword");
                  }}
                ></TextField>
              </td>
            </tr>
            <tr>
              <Button
                onClick={handlePasswordChange}
                style={{ color: "#3f51b5" }}
              >
                Change Password
              </Button>
            </tr>
          </table>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {profile.Role === "User" ? (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            Delete Account
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <span>
              <Typography>Do You want to Delete your Account?</Typography>
              <br />
              <Button onClick={handleDelete} style={{ color: "#3f51b5" }}>
                Delete Account
              </Button>
            </span>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ) : null}
    </div>
  );
}
