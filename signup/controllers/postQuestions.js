const mongoose = require("mongoose");
const Help = require("../models/help");

const postQuestions = (req, res) => {
  let message = req.body.message;
  // let isFeedback = req.body.isFeedback;
  let userName = req.userid;
  //let subject = req.body.subject;
  async function contactus() {
    const contact = new Help({
      //  _id: mongoose.Types.ObjectId(),
      message: message,
      // isFeedback: isFeedback,
      Userid: userName,
      // subject: subject,
      post_date: new Date(),
    });
    const result = await contact.save();
    res.json({ isMsgPosted: true, result: result });
    //console.log('result', result);
  }
  contactus();
};

module.exports = postQuestions;
