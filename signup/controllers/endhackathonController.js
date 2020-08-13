let mongoose = require("mongoose");
let fs = require("fs");
let path = require("path");
let result = require("../models/result");

let endhackathon = (req, res) => {
  tcno = req.params.Id;
  console.log("tcno", tcno);
  Userid = req.userid;
  Hackathon_name = req.body.Hackathon_name;
  language = req.body.language;
  code = req.body.code;
  Resultid = Userid + "." + Hackathon_name;

  let precode = "import time\nstart_time = time.time()\n";
  let postcode = "\nprint((time.time() - start_time))";
  let filename = Userid + Hackathon_name + ".py";
  fs.writeFileSync(
    path.join(process.cwd(), "uploads", filename),
    precode + code + postcode
  );

  var read_File = fs.readFileSync(
    path.join(process.cwd(), "uploads", Hackathon_name + ".txt"),
    { encoding: "utf-8" }
  );
  let tc = read_File.split(".");
  let testCases = tc[0].split(",")[tcno - 1];
  console.log(testCases);

  var a = testCases.split(" ");
  var answer = a.pop();
  console.log(a);
  var child = require("child_process").execFile(
    "python",
    [path.join(process.cwd(), "uploads", filename), ...a],
    function (err, stdout, stderr) {
      if (stderr === "") {
        stdout = stdout.split("\r\n");
        if (stdout[0] === answer) {
          x = {
            error: false,
            executionTime: stdout[1],
          };
        } else {
          x = {
            // testCase: tcno,
            error: true,
            executionTime: "$",
          };
        }
      } else {
        x = {
          //testCase: tcno,
          error: true,
          executionTime: "$",
        };
      }
      console.log(x);
      result
        .findOne({ Resultid: Resultid })
        .then((data) => {
          // let y = data.Result;
          // y.push(x);
          data
            .updateOne({ Result: x })
            .then((data) => {
              res.json(data);
            })
            .catch((err) => {
              res.json({ error: err });
            });
        })
        .catch((err) => {
          res.json({ error: err });
        });
      res.send(x);
    }
  );
};

module.exports = endhackathon;
