let express = require("express");
let router = express.Router();
let isauth = require("../auth/userAuth");
let signup = require("../controllers/signupController");
let loginController = require("../controllers/loginController");
let changepassword = require("../controllers/changepasswordController");
let deleteUser = require("../controllers/deleteuserController");

router.post("/signup", signup);
router.post("/login", loginController);
router.put("/changepassword", isauth, changepassword);
router.get("/deleteuser", isauth, deleteUser);

module.exports = router;
