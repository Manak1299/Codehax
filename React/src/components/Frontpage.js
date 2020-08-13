import React from "react";
//import "./css/style.css";
import img from "./images/Hackathon.jpg";

export default function Frontpage() {
  return (
    <div>
      <div>
        <img src={img} style={{ width: "50%", position: "absolute" }}></img>
      </div>

      <div style={{ width: "50%", marginLeft: "50%", top: "100%" }}>
        <h1 style={{ margin: "15px", textAlign: "center" }}>
          What is CodeHacks?
        </h1>{" "}
        <p style={{ margin: "15px", textAlign: "justify" }}>
          ‘CodeHacks’ is an online hackathon platform developed for programmers
          and students for the following reasons, To challenge and engage the
          developer community across various geographies, To enable knowledge
          expansion for developers, To provide programmers a platform for
          constant practice and improvement, To enable developers to benchmark
          their talent against peers, To have fun. It includes various
          challenges and enables developes to test their skills, brain-storm and
          solve the given problems.
        </p>
      </div>
    </div>
  );
}
