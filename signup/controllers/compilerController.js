let fs = require("fs");
let path = require("path");
let compile = (req, res) => {
  var Userid = req.userid;
  var Hackathon_name = req.body.Hackathon_name;
  var language = req.body.language;
  var code = req.body.code;
  let precode = "import time\nstart_time = time.time()\n";
  let postcode = "\nprint((time.time() - start_time))";
  let filename = Userid + Hackathon_name + ".py";
  fs.writeFileSync(
    path.join(process.cwd(), "uploads", filename),
    precode + code + postcode
  );

  var readFile = fs.readFileSync(
    path.join(process.cwd(), "uploads", Hackathon_name + ".txt"),
    { encoding: "utf-8" }
  );
  let testCase1 = readFile.split(",")[0];
  let a = testCase1.split(" ");
  answer = a.pop();
  var child = require("child_process").execFile(
    "python",
    [path.join(process.cwd(), "uploads", filename), ...a],
    function(err, stdout, stderr) {
      //res.json("output: "+stdout);
      if (stderr === "") {
        console.log(stdout);
        stdout = stdout.split("\r\n");
        if (stdout[0] === answer) {
          let executionTime = stdout[1];
          res.status(200).json({ result: "true", "timetaken:": executionTime });
        } else {
          //console.log(stdout[0]);
          res
            .status(201)
            .json({
              result: "false",
              output: stdout[0],
              input: a,
              eoutput: answer
            });
        }
      } else {
        console.log(stderr);
        res.status(400).json({ error: stderr });
      }
    }
  );
};

module.exports = compile;
