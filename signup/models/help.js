const mongoose = require("mongoose");
const contactusSchema = mongoose.Schema({
  isSolved: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
  },
  // subject: {
  //   type: String,
  // },
  // isFeedback: {
  //   type: Boolean,
  // },
  post_date: {
    type: mongoose.Schema.Types.Date,
  },
  solve_date: {
    type: mongoose.Schema.Types.Date,
  },
  Userid: {
    type: String,
  },
  answer: {
    type: String,
  },
});

module.exports = mongoose.model("contactus", contactusSchema);
