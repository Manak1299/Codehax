var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var user = require("../models/user");

let updateuserdetails = (req, res) => {
  Userid = req.userid;
  //Password = bcrypt.hashSync(req.body.Password, 10);
  user
    .findOne({ Userid: Userid })
    .then(user => {
      user
        .update({
          //  Password: Password,
          Name: req.body.Name,
          Email: req.body.Email
        })
        .then(data => {
          res.status(200).json({ userupdated: true });
        })
        .catch(error => {
          res.status(400).json({ error: error });
        });
    })
    .catch(() => {
      res.status(404).json("User not found");
    });
};

module.exports = updateuserdetails;
