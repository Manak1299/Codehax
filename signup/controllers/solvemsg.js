const mongoose = require("mongoose");
const help = require("../models/help");

let solve = (req, res) => {
  msgId = req.params.msgId;

  console.log(msgId, req.body.answer);
  let findmsg = help
    .findOne({ _id: msgId })
    .then((data) => {
      data
        .updateOne({
          isSolved: true,
          answer: req.body.answer,
          solve_date: new Date(),
        })
        .then((data) => {
          res.json({ isSolved: true, data: data });
        })
        .catch((err) => {
          res.send({ error: err });
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

module.exports = solve;
