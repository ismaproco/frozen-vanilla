//Module for data access functions
var method = Data.prototype;

function Data()
{
	
}

Data.connectDB = function(pg,response)
{
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   client.query('SELECT * FROM requests', function(err, result) {
    
    if(err) return console.error(err);
        console.log(result.rows);
	
	response.send(result.rows);
   });
  });
};

module.exports = Data;
