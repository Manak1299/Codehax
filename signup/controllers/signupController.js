const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Joi = require("@hapi/joi");
let user = require("../models/user");
let authSchema = require("../validations/signupValidations");

const signup = (req, res) => {
  console.log(
    req.body.Password,
    req.body.Userid,
    req.body.Role,
    req.body.Name,
    req.body.Email
  );
  var Password = req.body.Password;

  var hashedpassword = bcrypt.hashSync(Password, 10, (err, data) => {
    if (!err) {
      console.log("ecrr pass:" + data);
    } else {
      console.log("err in bcrypt");
    }
  });
  let toValidate = {
    Userid: req.body.Userid,
    Password: Password,
    Email: req.body.Email
  };
  try {
    Joi.assert(toValidate, authSchema);
  } catch (e) {
    res.status(422).send("err: " + e);
  }

  const user1 = new user({
    _id: mongoose.Types.ObjectId(),
    Role: req.body.Role,
    Userid: req.body.Userid,
    Password: hashedpassword,
    Name: req.body.Name,
    Email: req.body.Email,
    isDeleted: false
  });
  //console.log("user", user1);
  user1
    .save()
    .then(data => {
      res.status(201).json({ signup: "successful" });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while signup."
      });
    });
};
module.exports = signup;
