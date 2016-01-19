var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

//Connects Mongoose to MongoDB
mongoose.connect("mongodb://localhost/yelp_camp");

// Tells express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Sets the file type to ejs unless stated otherwise
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Stoney Creek", 
//         image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg"
        
//     }, 
//     function(err, campground) {
//       if (err) {
//           console.log(err);
//       } else {
//           console.log("New Campground:");
//           console.log(campground);
//       }
// });

// Define routes
// Landing page route
app.get("/", function(req, res) {
    res.render("landing");
});
// Campgrounds page route
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
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