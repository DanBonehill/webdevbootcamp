var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Rachel", "Sophie", "Lydia", "Ryan", "Sara", "Jonathan"];

app.get("/", function(req, res) {
   res.render("home"); 
});

app.post("/addfriend", function(req, res) {
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
   res.redirect("/friends"); 
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
})
;
app.get("*", function(req, res) {
    res.send("Error: Page Not Found");
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started"); 
});