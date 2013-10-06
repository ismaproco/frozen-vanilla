var express = require("express");
var pg = require("pg");

//Internal vars
var data = require("./data.js");
//


var app = express();
app.use(express.logger());

app.get('/allItems', function(request, response) {
 // response.send('Probando!!!');
	var item = data.connectDB(pg,response);
	console.log(item);
	
});

app.get('/insert', function(request, response) {
	data.insertJSON(pg,response,request);
	response.send('Insert OK');
});

app.post('/insert', function(request, response) {
	data.insertJSON(pg,response,request);
	response.send('Insert OK');
});

app.get('/', function(request, response) {
	response.send('Don\'t trust in this message!!!');
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



