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
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name,
        image: image,
        description: desc,
        author: author
    };
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            console.log(newlyCreated);
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
// Edit Campground Route
router.get("/:id/edit", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.render("campgrounds/edit", {campground: foundCampground});
       }
    });
});
// Update Campground Route
router.put("/:id", function(req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});
// Destroy Route
router.delete("/:id", function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
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