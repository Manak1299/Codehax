const mongoose = require("mongoose");
const result = require("../models/result");

let getuserresult = (req, res) => {
  Userid = req.userid;
  result
    .find({ Userid: Userid })
    .then(result => {
      //  result=result[0];
      console.log(result.length);
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(400).json("user not found");
    });
};

module.exports = getuserresult;
