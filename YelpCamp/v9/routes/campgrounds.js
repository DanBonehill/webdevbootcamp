var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground");

// Campgrounds page route - INDEX
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});
// Campgrounds page Post route - CREATE
router.post("/", isLoggedIn, function(req, res) {
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
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});
// Shows more info about campground
router.get("/:id", function(req, res) {
    // Find camground with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if (err) {
           console.log(err);
       } else {
           console.log(foundCampground);
           // Render show tempalte with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});
// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;