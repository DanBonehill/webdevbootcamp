var express     = require("express"),
    app         = express(),
    bodyParer   = require("body-parser"),
    mongoose    = require("mongoose");

// App Config
// Connects to (or creates) the database collection    
mongoose.connect("mongodb://localhost/restful_blog_app");
// Sets default file type to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParer.urlencoded({extended: true}));
// Mongoose/ Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
// RESTful Routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
});
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
       if (err) {
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
    });
});

// Server listening for start command
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started"); 
});