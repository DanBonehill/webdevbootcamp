var express = require("express"),
    request = require("request"),
    app     = express();
    
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});
app.get("/results", function(req, res) {
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query
    request(url, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server Started");
})