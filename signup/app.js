require("./config/db");
//require('dotenv').config()
const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const auth = require("./routes/authRoutes");
const admin = require("./routes/adminRoutes");
const user = require("./routes/userRoutes");

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
app.use("/auth", auth);
app.use("/user", user);
app.use("/admin", admin);

app.listen(process.env.PORT, (err, data) => {
  if (!err) {
    console.log("server started at: " + process.env.PORT);
  }
});
