let hackathon = require("../models/hackathon");
let mongoose = require("mongoose");

let results = (req, res) => {
  hackathon
    .find({ isDeleted: false })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error });
    });
};

module.exports = results;
