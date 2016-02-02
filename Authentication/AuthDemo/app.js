var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();
    
mongoose.connect("mongodb://localhost/autho_demo_app");

app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "My name is Daniel and I'm learning to code",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res) {
    res.render("home");
});
app.get("/secret", function(req, res) {
   res.render("secret"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started"); 
});