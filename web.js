// web.js
var express = require("express");
var logfmt = require("logfmt");
var index = require("./routes/index")
var path = require('path');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname+"/views" );

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index',{title: "I love big tongue!"});
});



var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});