import React from "react";
import UpcomingHack from "./UserComp/UpcomingHack";
import Editor from "./UserComp/Editor";
import AdminPage from "./AdminComp/AdminPage";
import DeclareResults from "./AdminComp/DeclareResults";
import HelpUser from "./UserComp/HelpUser";
import HelpAdmin from "./AdminComp/HelpAdmin";

export default function Comp(props) {
  let role = props.role;
  let value = props.value;
  let Hackathon = props.Hackathon;
  if (role === "Admin") {
    if (value === 0) {
      return <AdminPage />;
    } else if (value === 1) {
      return <DeclareResults />;
    } else if (value === 2) {
      return <HelpAdmin />;
    }
  } else {
    if (value === 0) {
      return <UpcomingHack />;
    } else if (value === 1) {
      return <DeclareResults />;
    } else if (value === 2) {
      return <HelpUser />;
    } else return <Editor Hackathon={Hackathon} />;
  }
}
