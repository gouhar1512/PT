var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var opn = require('opn');
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
var fs = require("fs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});


app.post("/", (req, res) => {
  let data = req.body.data;
  fs.writeFile(`localJson${Date.now()}.json`, data, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
});


// opens the url in the default browser 
var url = 'http://localhost:3000'
opn(url);

console.log("Listening at port 3000...");
app.listen(3000);
