// web.js
var express = require("express");
var index = require("./routes/index")
var path = require('path');
var app = express();
var mongoose = require('mongoose');

var gossipObject = require('./routes/model.js')
var mongoURL = "mongodb://gg123:321gg@ds051788.mongolab.com:51788/whj1"

mongoose.connect(mongoURL, function(err){
  if(err) {
    console.log("err in connect");
    throw err;
  }
  else{
    console.log("connect success");
  }
}); // connect to our database
var counter = 1;

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
  res.render('index',{title: "NTU Gossip"});
});

app.post('/message', function(req, res) {
    if (!req.body.hasOwnProperty('mes')){
      res.statusCode = 400;
      return res.send('Error 400: Post syntax incorrect.');
    }
    var message = new gossipObject;

    // gossipObject.count({}, function(err, count){
    //   message.id = count.toString();
    // })
    message.id =  "save";

    message.text = req.body.mes;

    message.save(function(err, data){
      if(err){
        console.log("err");
        console.log("failm da", data);
        alert('噢不，Something Wrong～')
        res.statusCode = 400;
        return res.send("Error 400: Save Failed");
      }
      else{
        console.log("Success");
        console.log("suc, da", data);
        // res.redirect(200,'/');
        counter++;
        res.statusCode = 200;
        return res.send({re: '/'});
      }
    });
});

app.get('/manage/all', function(req, res) {
  gossipObject.find( function ( err, list, count ){
    res.json( {
        title : 'All list',
        todos : list,
        count : count
    });
  });
});

app.get('/manage/new', function(req, res) {
  gossipObject.find({id: "new"}, function ( err, list, count ){
    res.json( {
        title : 'All list',
        todos : list,
        count : count
    });
  });
});

app.put('/manage/pos/:id', function(req, res) {
  console.log(typeof(req.params.id));

  gossipObject.findOne( {_id:req.params.id}, function ( err, list ){
    if(err){
      console.log("errrrrrrr");
    }    
    list.id = "posted" ;
    list.save(function(err, list, count){
      console.log("posted success");
      res.json( {
        find : list
      })
    })  
  });
});

app.del('/manage/del/:id', function(req, res) {
  console.log(typeof(req.params.id));

  gossipObject.findOne( {_id:req.params.id}, function ( err, list ){
    if(err){
      console.log("errrrrrrr");
    }    
    list.remove(function(err, list, count){
      console.log("remove success");
      res.json( {
        find : list
      })
    })  
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
