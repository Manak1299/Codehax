let express = require("express");
let router = express.Router();
let isauth = require("../auth/userAuth");
let getuserdetails = require("../controllers/getuserdetailsController");
let getuserresult = require("../controllers/getuserresultController");
let updateuserdetails = require("../controllers/updateuserdetailsController");
let startHackathon = require("../controllers/starthackathonController");
let endHackathon = require("../controllers/endhackathonController");
let compile = require("../controllers/compilerController");
let upcomingHackathons = require("../controllers/upcomingHackathons");
let gethackathon = require("../controllers/gethackathonController");
let getResults = require("../controllers/getResult");
let postQuestion = require("../controllers/postQuestions");
let getPosts = require("../controllers/getPosts");

router.get("/profile/getdetails", isauth, getuserdetails);
router.get("/profile/getresults", isauth, getuserresult);
router.put("/profile/updatedetails", isauth, updateuserdetails);
router.get("/hackathon/upcominghackathons", upcomingHackathons); //change dummy date ++no is auth
router.get("/hackathon/getdetails/:Hackathon_name", isauth, gethackathon);
router.post("/hackathon/starthackathon", isauth, startHackathon);
router.put("/hackathon/endhackathon/:Id", isauth, endHackathon);
router.post("/hackathon/compile", isauth, compile);
router.post("/help/postQuestion", isauth, postQuestion);
router.get("/help/getPosts", isauth, getPosts);
router.get("/result", isauth, getResults);

module.exports = router;
