var express = require("express");
var pg = require("pg");

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
 // response.send('Probando!!!');
	var item = connectDB(response);
	console.log(item);
	
});

app.get('/sava', function(request, response) {
	response.send('Probando!!!');
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


function connectDB(response)
{
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   client.query('SELECT * FROM requests', function(err, result) {
    
    if(err) return console.error(err);
        console.log(result.rows);
	
	response.send(result.rows);
   });
  });
}
