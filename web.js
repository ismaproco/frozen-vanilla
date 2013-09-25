var express = require("express");
var pg = require("pg");

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
 // response.send('Probando!!!');
	var item = connectDB(response);
	var resp = typeof(item);
	console.log(resp);
	
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


function connectDB(response)
{
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   client.query('SELECT * FROM requests', function(err, result) {
    done();
    if(err) return console.error(err);
        console.log(result.rows);
	response.writeHead(200,{'Content-Tyoe':'application/json'});
	response.send(result.rows[0]);
   });
  });
}
