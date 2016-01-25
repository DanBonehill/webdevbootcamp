var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

seedDB();
//Connects Mongoose to MongoDB
mongoose.connect("mongodb://localhost/yelp_camp_v3");

// Tells express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Sets the file type to ejs unless stated otherwise
app.set("view engine", "ejs");

// Define routes
// Landing page route
app.get("/", function(req, res) {
    res.render("landing");
});
// Campgrounds page route - INDEX
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});
// Campgrounds page Post route - CREATE
app.post("/campgrounds", function(req, res) {
    // get data from form & add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
          // redirect back to campgrounds page
        res.redirect("/campgrounds");  
        }
    });
});
// Show form to create new campground - NEW
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});
// Shows more info about 1 campground
app.get("/campgrounds/:id", function(req, res) {
    // Find camground with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if (err) {
           console.log(err);
       } else {
           console.log(foundCampground);
           // Render show tempalte with that campground
           res.render("show", {campground: foundCampground});
       }
    });
});
// Error message if unexpected route requested
app.get("*", function(req, res) {
   res.send("Error: Page Not Found"); 
});

//Listen for server start command
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started"); 
});