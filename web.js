var express = require('express');
var mongo = require('./mongo_services.js');

var app = express();

var cm = new mongo();
cm.init();




app.use(express.logger());
app.use(express.static(__dirname + '/public'));


app.post('/mongo',function(req,res){
    cm.saveInstagram(req,res);
    res.write('done post!');
    res.end();
});

app.get('/mongo',function(req,res){
    cm.saveInstagram(req,res);

    res.write('done get!');
    res.end();
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});