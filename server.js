var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
var fs = require("fs");

// viewed at http://localhost:3000
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/", function(req, res) {
  let data = req.body.data;
  fs.writeFile("localJson.json", data, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
});

app.listen(3000);
