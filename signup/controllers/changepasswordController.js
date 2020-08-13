let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let Joi = require("@hapi/joi");

let user = require("../models/user");
let authSchema = require("../validations/changePasswordValidations");

let changepassword = function(req, res) {
  //res.json(req.userid);
  userid = req.userid;
  Password = req.body.Password;
  let toValidate = { Password: Password };
  try {
    Joi.assert(toValidate, authSchema);
  } catch (e) {
    res.status(422).send("error: " + e);
  }

  password = bcrypt.hashSync(Password, 10);
  oldPassword = req.body.oldPassword;
  user
    .findOne({ Userid: userid })
    .then(user => {
      //   console.log(user);
      bcrypt
        .compare(oldPassword, user.Password)
        .then(data => {
          user
            .updateOne({ Password: password })
            .then(data => {
              console.log(data);
              res.status(200).json({ passwordchanged: true });
            })
            .catch(err => {
              console.log(err);
              res.status(404).json(err);
            });
        })
        .catch(error => {
          res.status(404).json({ password: "incorrect" });
        });
    })
    .catch(err => {
      res.status(404).json("user not found");
    });
};

module.exports = changepassword;

/*let user = await user.findOne({Userid:userid})
  
    
    console.log(user)
    user.password=req.body.password;
    res.json(user);
 */

/*  OldPassword=req.body.OldPassword;
    NewPassword=req.body.NewPassword;
    let OldHPassword= bcrypt.hash(OldPassword,10,(err,hash)=>{
        if(!err){console.log('ok');}
    });
    let NewHPassword= bcrypt.hash(NewPassword,10,(err,hash)=>{
        if(!err){console.log('ok');}
    });
    user.findOneAndUpdate({Password:OldHPassword},{Password:NewHPassword},{
        new: true
      })
    .then((user)=> {
        res.json(user);
    }).catch(err => {
        res.status(500).send({
            message: "Error updating with password " 
        });
    });*/
