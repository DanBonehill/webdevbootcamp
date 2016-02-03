var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

//Connects Mongoose to MongoDB
mongoose.connect("mongodb://localhost/yelp_camp_v6");
// Tells express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Sets the file type to ejs unless stated otherwise
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "Yelpcamp Application is the best Application",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
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
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});
// =============== //
// Comments Routes //
// =============== //
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});
app.post("/campgrounds/:id/comments", function(req, res) {
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          Comment.create(req.body.comment, function(err, comment) {
              if (err) {
                  console.log(err);
              } else {
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
      }
   });
});
// ============ //
// Auth Routes //
// =========== //
app.get("/register", function(req, res) {
   res.render("register"); 
});
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
      if (err) {
          console.log(err);
          return res.render("register");
      }
      passport.authenticate("local")(req, res, function() {
         res.redirect("/campgrounds"); 
      });
   });
});
app.get("/login", function(req, res) {
   res.render("login"); 
});
app.post("/login", passport.authenticate("local",
    {
        sucessRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
});
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});
// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
// Error message if unexpected route requested
app.get("*", function(req, res) {
   res.send("Error: Page Not Found"); 
});
//Listen for server start command
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started"); 
});