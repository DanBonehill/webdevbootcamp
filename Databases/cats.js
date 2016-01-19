var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat-app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// Adding a new cat to the DB
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat) {
//     if (err) {
//         console.log("There was an error");
//     } else {
//         console.log("Cat added to DB:");
//         console.log(cat);
//     }
// });

Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat) {
    if (err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});

// Restrieve all cats in the database

Cat.find({}, function(err, cats) {
    if (err) {
        console.log("There was an error");
        console.log(err);
    } else {
        console.log("All the cats:");
        console.log(cats);
    }
});