var express = require("express"),
    request = require("request"),
    app     = express();
    
app.get("/results", function(req, res) {
    request("http://omdbapi.com/?s=Frozen", function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.send(data);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server Started");
})