var mongoose = require("mongoose");
var hackathon = require("../models/hackathon");

let HackathonList = (req, res) => {
  let Hlist = [];
  hackathon
    .find()
    .then(hackathon => {
      hackathon.map(hack => {
        if (!hack.isDeleted) {
          Hlist.push(hack);
        }
      });
      res.json(Hlist);
    })
    .catch(error => {
      res.json("error:" + error);
    });
};

module.exports = HackathonList;
