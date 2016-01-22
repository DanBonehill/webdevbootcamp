var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// Post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "hermione@hogwarts.com",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//   title: "How to brew Polyjuice Potion",
//   content: "Just kidding.. Go to postions class!"
// });

// newUser.save(function(err, user) {
//   if (err) {
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious!"
// });
// newPost.save(function(err, post) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

// Find User
User.findOne({name: "Hermione Granger"}, function(err, user) {
   if (err) {
       console.log(err);
   } else {
       // Push in new post to user
       user.posts.push({
           title: "3 Things I really hate",
           content: "Voldermort. Voldermort. Voldermort"
       });
       // Save post to user
       user.save(function(err, user) {
          if (err) {
              console.log(err);
          } else {
              console.log(user);
          }
       });
   }
});