var express = require("express"),
    app     = express();
    
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});
app.get("/about", function(req, res) {
    res.render("about");
});
app.get("*", function(req, res) {
    res.send("Error: Page Not Found");
});
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started");
});