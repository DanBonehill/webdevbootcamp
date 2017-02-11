var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
// Requiring Routes    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v10";
//Connects Mongoose to MongoDB
mongoose.connect(url);
// Tells express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Sets the file type to ejs unless stated otherwise
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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

app.use(function(req, res, next) {
   res.locals.currentUser   = req.user;
   res.locals.error         = req.flash("error");
   res.locals.success       = req.flash("success");
   next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

//Listen for server start command
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started"); 
});