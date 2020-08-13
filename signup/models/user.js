const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Role: {
    type: String,
    required: true
  },
  Userid: {
    type: String
    /*  required:true,
        unique:true*/
  },
  Password: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
    //  unique:true
  },
  isDeleted: false
});

userschema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userschema);
