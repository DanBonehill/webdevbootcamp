var express     = require("express"),
    app         = express(),
    bodyParser   = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override");

// App Config
// Connects to (or creates) the database collection    
mongoose.connect("mongodb://localhost/restful_blog_app");
// Sets default file type to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
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
// Index Route
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
       if (err) {
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
    });
});
// New Route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});
// Create Route
app.post("/blogs", function(req, res) {
   // Create Blog
   Blog.create(req.body.blog, function(err, newBlog) {
       if (err) {
           res.render("new");
       } else {
            // Redirect to Index
            res.redirect("/blogs"); 
       }
   });
});
// Show Route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});
// Edit Route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});    
        }
    });
});
// Update Route
app.put("/blogs/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});
// Destroy Route
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});
// Server listening for start command
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started"); 
});