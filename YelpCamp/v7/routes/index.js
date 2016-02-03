var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");

// Root Route
router.get("/", function(req, res) {
    res.render("landing");
});
// Resgister Form Route
router.get("/register", function(req, res) {
   res.render("register"); 
});
// Register Submit Route
router.post("/register", function(req, res) {
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
// Login Form Route
router.get("/login", function(req, res) {
   res.render("login"); 
});
// Login Submit Route
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
});
// Logout Route
router.get("/logout", function(req, res) {
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
router.get("*", function(req, res) {
   res.send("Error: Page Not Found"); 
});
module.exports = router;