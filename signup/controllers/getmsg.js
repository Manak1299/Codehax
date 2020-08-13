const mongoose = require("mongoose");
const help = require("../models/help");

let getmsg = (req, res) => {
  async function findmsg() {
    let findmsg = [];

    const find = await help.find();
    for (let i = 0; i < find.length; i++) {
      if (!find[i].isSolved) {
        //console.log(find[i]);
        findmsg.push(find[i]);
      }
    }
    //console.log(findmsg, "this is findmsg");
    res.json(findmsg);
  }
  findmsg();
};

module.exports = getmsg;
