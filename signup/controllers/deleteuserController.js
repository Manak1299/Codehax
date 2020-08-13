let mongoose = require("mongoose");
let user = require("../models/user");

let deleteUser = (req, res) => {
  user
    .findOne({ Userid: req.userid })
    .then(user => {
      console.log(user);
      // user.isDeleted=true;
      user
        .updateOne({ isDeleted: true })
        .then(data => {
          res.status(200).json({ userDeleted: true });
        })
        .catch(error => {
          res.status(404).json({ error: error });
        });
    })
    .catch(error => {
      res.status(404).json("user not found");
    });
};

module.exports = deleteUser;
