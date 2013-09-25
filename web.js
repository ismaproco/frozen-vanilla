var express = require("express");
var pg = require("pg");

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
 // response.send('Probando!!!');
	response.send(connectDB());
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


function connectDB()
{
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   client.query('SELECT * FROM requests', function(err, result) {
    done();
    if(err) return console.error(err);
    //console.log(result.rows);
	return result.rows;
   });
  });
}
