var mongoose = require("mongoose");
var result = require("../models/result");

var getResult = (req, res) => {
  let Userid = req.userid;
  result
    .find({ Userid: Userid })
    .then((data) => {
      res
        .status(200)
        .send({ Hackathon_name: data.Hackathon_name, Rank: data.Rank });
    })
    .catch((error) => {
      res.status(404).json({ error: "user not found" });
    });
};

module.exports = getResult;
