let express = require("express");
let router = express.Router();
let isauth = require("../auth/userAuth");
let getuserdetails = require("../controllers/getuserdetailsController");
let updateuserdetails = require("../controllers/updateuserdetailsController");
let postHackathon = require("../controllers/postHackathonController");
let deleteHackathon = require("../controllers/deleteHackathonController");
let gethackathon = require("../controllers/gethackathonController");
let hackathonlist = require("../controllers/hackathonlist");
let ResultgetHackathon = require("../controllers/ResultgetHackathon");
let getmsg = require("../controllers/getmsg");
let solvemsg = require("../controllers/solvemsg");
let giveResults = require("../controllers/giveResults");

router.get("/profile/getdetails", isauth, getuserdetails);
router.put("/profile/updatedetails", isauth, updateuserdetails);
router.post("/hackathon/posthackathon", isauth, postHackathon); //ckeck isadmin
router.get("/hackathon/hackathonlist", isauth, hackathonlist);
router.get("/hackathon/getdetails/:Hackathon_name", isauth, gethackathon);
router.get(
  "/hackathon/deletehackathon/:Hackathon_name",
  isauth,
  deleteHackathon
);
//router.get("/hackathon/results/:Hackathon_name", isauth, results);
router.get("/result/getHackathon", isauth, ResultgetHackathon);
router.get("/help/getmsg", isauth, getmsg);
router.put("/help/solvemsg/:msgId", isauth, solvemsg);
router.put("/result/giveResult/:Hackathon_name", isauth, giveResults);

module.exports = router;
