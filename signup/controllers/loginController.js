let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

let user = require("../models/user");

let login = function(req, res) {
  User_id = req.body.Userid;
  Password = req.body.Password;

  user
    .findOne({ Userid: User_id })
    .then(user => {
      if (
        bcrypt.compareSync(Password, user.Password) &&
        user.isDeleted === false
      ) {
        var tokenize = {
          Role: user.Role,
          Userid: user.Userid,
          Email: user.Email
        };
        console.log(tokenize);
        // var token = JSON.stringify(user);
        var t1 = jwt.sign(tokenize, process.env.jwt_publickey);
        //console.log(t1);
        res.header("token", t1);
        res.status(200).json({ token: t1 });
      } else {
        res.status(401).json({ login: "failed" });
      }
    })
    .catch(err => {
      return res.status(404).send({
        message: "User not found with id " + req.body.Userid
      });
    });
};

module.exports = login;
