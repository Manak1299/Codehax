const mongoose = require("mongoose");
const help = require("../models/help");

let getPosts = (req, res) => {
  let userName = req.userid;
  async function findmsg() {
    const findUser = await help.find({ Userid: userName });

    //console.log(findUser, "this is findmsg");
    res.json(findUser);
  }
  findmsg();
};

module.exports = getPosts;
