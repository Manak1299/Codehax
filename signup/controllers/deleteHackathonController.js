let mongoose = require("mongoose");
let hackathon = require("../models/hackathon");
let user = require("../models/user");

let deleteHackathon = (req, res) => {
  Userid = req.userid;
  user.findOne({ Userid: Userid }).then(user => {
    if (user.Role === "Admin") {
      hackathon
        .findOne({ Hackathon_name: req.params.Hackathon_name })
        .then(hackathon => {
          hackathon
            .updateOne({ isDeleted: true })
            .then(data => {
              res.status(200).json({ isDelete: true });
            })
            .catch(error => {
              res.status(400).json({ error: error });
            });
        })
        .catch(error => {
          res.status(400).json("hackathon not found");
        });
    } else {
      res.status(401).json({ isAdmin: false });
    }
  });
};

module.exports = deleteHackathon;
