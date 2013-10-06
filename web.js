var express = require("express");
var pg = require("pg");

//Internal vars
var data = require("./data.js");
//


var app = express();
app.use(express.logger());

app.get('/allItems', function(request, response) {
 // response.send('Probando!!!');
	var item = data.connectDB(response);
	console.log(item);
	
});

app.get('/sava', function(request, response) {
	response.send('Probando!!!');
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



