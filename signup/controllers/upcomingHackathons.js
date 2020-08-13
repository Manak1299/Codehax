var mongoose = require("mongoose");
var hackathon = require("../models/hackathon");

let upcomingHackathons = (req, res) => {
  hackathon
    .find()
    .then(hackathon => {
      var date = new Date("2012-01-22T14:56:59.301+00:00");
      //  res.json(hackathon.length);
      var i;
      let hack = [];
      for (i = 0; i < hackathon.length; i++) {
        if (hackathon[i].Hackathon_date > date && !hackathon[i].isDeleted) {
          hack.push(hackathon[i]);
          /* */
        }
      }
      if (hack.length === 0) {
        res.json("no hack");
      } else {
        res.json(hack);
      }
      // if(hackathon.Hackathon_date>date)
      /*  */
    })
    .catch(error => {
      res.json("error" + error);
    });
};

module.exports = upcomingHackathons;
