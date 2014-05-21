// web.js
var express = require("express");
var logfmt = require("logfmt");
var index = require("./routes/index")
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname+"/views" );

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.render('index',{title: "I love big tongue!"});
});



var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});