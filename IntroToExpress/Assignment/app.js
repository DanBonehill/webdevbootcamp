var express = require("express");
var app = express();

// Home page
app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});
// Animal noises
app.get("/speak/:animal", function(req, res) {
    var animalNoises = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof",
        cat: "Meow",
        goldfish: "..."
    };
    var animal = req.params.animal.toLowerCase();
    var animalNoise = animalNoises[animal];
   res.send("The " + animal + " says '" + animalNoise + "'"); 
});
// String
app.get("/repeat/:string/:number", function(req, res) {
    var string = req.params.string;
    var num = req.params.number;
    var display = "";
    for (i = 0; i <= num; i++) {
        display += string + " ";
    }
    res.send(display);
});
// If user visits any other route
app.get("*", function(req, res) {
    res.send("The page you requested does not exist on this server");
});
// Tells Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});