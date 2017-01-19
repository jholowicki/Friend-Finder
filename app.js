// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Friend DATA
// =============================================================
var friends = [];
var matches = [];

// Routes
// =============================================================

// Basic route that sends the user to the app's first page.
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Basic route that sends the user to the survey page.
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});


// Route to send current data (as JSON) on Friend's List (API).

app.get("/friendslist", function(req, res) {
  res.send(
    JSON.stringify({
      friends: friends
    })
  )
  res.end();
})

// Creates a new friend upon survey submission.
app.post("/api/new", function(req, res) {
  var newFriend = req.body;
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newFriend);

  friends.push(newFriend);

  res.json(newFriend);
});

// Starts the server to begin listening.
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
