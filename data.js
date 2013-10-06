//Module for data access functions
var method = Data.prototype;

var strIns = 'insert into products(json) values(\'{"type":"television", "price": 899.99, "resolution":"1080p"}\'),   (\'{"type":"shoe", "price": 74.99, "size":10.5}\');';


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


Data.insertJSON = function(pg,response)
{
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
   client.query( strIns , function(err, result) {
    
    if(err) return console.error(err);
        console.log(result.rows);
	
	response.send(result.rows);
   });
  });
};








module.exports = Data;
