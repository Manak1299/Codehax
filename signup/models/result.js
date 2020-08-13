const mongoose = require("mongoose");
//const uniqueValidator = require('mongoose-unique-validator');
const Resultschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Resultid: {
    type: String,
  },
  Userid: {
    type: String,
    ref: "user",
  },
  Hackathon_name: {
    type: String,
    ref: "Hackathon",
  },
  startTime: {
    type: mongoose.Schema.Types.Date,
  },
  endTime: {
    type: mongoose.Schema.Types.Date,
  },
  language: {
    type: String,
  },
  Result: {
    type: Object,
  },
});
//userschema.plugin(uniqueValidator);
module.exports = mongoose.model("Result", Resultschema);
