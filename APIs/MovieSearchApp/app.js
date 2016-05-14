var express = require("express"),
    request = require("request"),
    app     = express();
    
app.set("view engine", "ejs");
    
app.get("/results", function(req, res) {
    request("http://omdbapi.com/?s=Star", function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server Started");
})