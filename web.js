// web.js
var express = require("express");
var index = require("./routes/index")
var path = require('path');
var app = express();
var mongoose = require('mongoose');

var gossipObject = require('./routes/model.js')
var mongoURL = "mongodb://aaa:aaa@ds051788.mongolab.com:51788/whj1"

mongoose.connect(mongoURL, function(err){
  if(err) {
    console.log("err in connect");
    throw err;
  }
  else{
    console.log("connect success");
  }
}); // connect to our database

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
  res.render('index',{title: "NTU-GOSSIP"});
});

app.post('/message', function(req, res) {
    if (!req.body.hasOwnProperty('mes')){
      res.statusCode = 400;
      return res.send('Error 400: Post syntax incorrect.');
    }
    var message = new gossipObject;
    message.id = "2";
    message.text = req.body.mes;
    message.date = new Date();

    console.log("nn", message);
    message.save(function(err, data){
      if(err){
        console.log("err");
        console.log("failm da", data);
        res.send("err");
      }
      else{
        console.log("Success");
        console.log("suc, da", data);
        res.send("wooo");
      }
    });

});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
