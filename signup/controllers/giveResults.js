var mongoose = require("mongoose");
var result = require("../models/result");

let giveResults = (req, res) => {
  Hackathon_name = req.params.Hackathon_name;
  let arr = [];
  result
    .find({ Hackathon_name: Hackathon_name })
    .then((data) => {
      //res.json(data);
      data.map((data) => {
        if (data.Result && !data.Result.error && data.Result.executionTime) {
          arr.push({
            Userid: data.Userid,
            executionTime: data.Result.executionTime,
          });
        }
      });
      let result = arr.sort((a, b) => {
        if (a.executionTime > b.executionTime) return 1;
        else return -1;
      });
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: "err1" });
    });
};
module.exports = giveResults;
