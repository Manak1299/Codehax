const mongoose = require("mongoose");
const Hackathonschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Hackathon_name: {
    type: String,
    required: true,
  },
  Hackathon_definition: {
    type: String,
    required: true,
  },
  Hackathon_date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  Hackathon_description: {
    type: String,
    required: true,
  },
  isDeleted: false,
  isResultDeclared: false,
});
module.exports = mongoose.model("Hackathon", Hackathonschema);
