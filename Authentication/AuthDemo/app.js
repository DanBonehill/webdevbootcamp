var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();
    
mongoose.connect("mongodb://localhost/auth_demo_app");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "My name is Daniel and I'm learning to code",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ====== //
// Routes
// ====== //
app.get("/", function(req, res) {
    res.render("home");
});
app.get("/secret", function(req, res) {
   res.render("secret"); 
});

// =========== //
// Auth Routes
// =========== //
app.get("/register", function(req, res) {
    res.render("register");
});
app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
       if (err) {
           console.log(err);
           res.render("register");
       } else {
           passport.authenticate("local")(req, res, function() {
               res.redirect("/secret");
           });
       }
    });
});
// ============ //
// Login Routes
// ============ //
app.get("/login", function(req, res) {
   res.render("login"); 
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res) {
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started");
});