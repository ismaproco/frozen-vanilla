var express = require('express');
var mongo = require('./mongo_services.js');

var app = express();

var cm = new mongo();
cm.init();




app.use(express.logger());
app.use(express.static(__dirname + '/public'));


app.post('/mongo',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
    
    cm.saveInstagram(req,res);
    res.write('done post!');
    res.end();
});

app.get('/mongo',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
    
    cm.saveInstagram(req,res);

    res.write('done get!');
    res.end();
});


app.get('/instacache_load',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
    
    cm.loadInstagram(req,res);
});


var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});