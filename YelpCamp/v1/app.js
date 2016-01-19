var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Tells express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Sets the file type to ejs unless stated otherwise
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2765/4240509073_d34393d09d.jpg"},
        {name: "Stoney Creek", image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg"},
        {name: "Flint Mountain", image: "https://farm8.staticflickr.com/7503/15623542806_8058899c7d.jpg"}
    ];

// Define routes
// Landing page route
app.get("/", function(req, res) {
    res.render("landing");
});
// Campgrounds page route
app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});
// Campgrounds page Post route
app.post("/campgrounds", function(req, res) {
    // get data from form & add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});
// Error message if unexpected route requested
app.get("*", function(req, res) {
   res.send("Error: Page Not Found"); 
});

//Listen for server start command
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started"); 
});