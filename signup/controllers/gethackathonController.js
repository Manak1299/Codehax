var mongoose = require("mongoose");
var hackathon = require("../models/hackathon");

let getHackathon = (req, res) => {
  hackathon
    .findOne({ Hackathon_name: req.params.Hackathon_name })
    .then(hackathon => {
      if (hackathon.isDeleted === false) {
        res.status(200).json({
          Hackathon_name: hackathon.Hackathon_name,
          Hackathon_definition: hackathon.Hackathon_definition,
          Hackathon_date: hackathon.Hackathon_date,
          Hackathon_description: hackathon.Hackathon_description
        });
      } else {
        res.status(400).json({ hackathon: "not available" });
      }
    })
    .catch(err => {
      res.status(404).json({ err: err });
    });
};

module.exports = getHackathon;
