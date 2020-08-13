const mongoose = require("mongoose");
const result = require("../models/result");

let startHackathon = (req, res) => {
  const doresult = new result({
    _id: mongoose.Types.ObjectId(),
    Resultid: req.userid + "." + req.body.Hackathon_name,
    Userid: req.userid,
    Hackathon_name: req.body.Hackathon_name,
    startTime: new Date().getTime()
  });
  doresult
    .save()
    .then(data => {
      res.status(200).json({ HactathonStarted: true });
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

module.exports = startHackathon;
