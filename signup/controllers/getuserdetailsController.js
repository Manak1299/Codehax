var mongoose = require("mongoose");
var user = require("../models/user");

let getuserdetails = (req, res) => {
  Userid = req.userid;
  user
    .findOne({ Userid: Userid })
    .then(user => {
      res.json(user);
    })
    .catch(() => {
      res.json("User not found");
    });
};

module.exports = getuserdetails;
