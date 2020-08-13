var multer = require("multer");
let hackathon = require("../models/hackathon");
let mongoose = require("mongoose");

let uploadtestcases = (req, res) => {
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "uploads");
    },
    filename: function(req, file, cb) {
      cb(null, req.body.Hackathon_name + ".txt");
    }
  });

  var upload = multer({ storage: storage }).single("testcases");

  upload(req, res, function(err) {
    if (!err) {
      let hackathon1 = new hackathon({
        _id: mongoose.Types.ObjectId(),
        Hackathon_name: req.body.Hackathon_name,
        Hackathon_definition: req.body.Hackathon_definition,
        Hackathon_date: req.body.Hackathon_date,
        Hackathon_description: req.body.Hackathon_description,
        isDeleted: false
      });
      //console.log(hackathon1);
      hackathon1
        .save()
        .then(hackathon => {
          console.log(hackathon);
          res.status(200).json(hackathon);
        })
        .catch(err => {
          res.json({ "Posting hackathon": "failed" + err });
        });
    } else {
      res.json({
        error: true
      });
    }
  });
};

module.exports = uploadtestcases;
