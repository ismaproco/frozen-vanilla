var express = require('express');
var mongo = require('./mongo_services.js');

var app = express();

var cm = new mongo();
cm.init();
cm.saveInstagram();



app.use(express.logger());
app.use(express.static(__dirname + '/public'));

app.get('/mongo',function(req,res){
    res.write('Hello World');
    res.end();
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});