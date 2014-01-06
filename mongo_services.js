var mongoose = require('mongoose');
var conf = require('./conf');

var model;

function ConnectionManager() {}

ConnectionManager.prototype.init = function() {
	db = mongoose.connect(conf.MONGO_URL);

	mongoose.connection.once('connected',function(){
		//CreateModelProcessedInternetItemCollection();
		CreateModelInstagramPost();
	});
	
};

ConnectionManager.prototype.saveInstagram = function(res) {
  if( mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	
	console.log("Connected to database");
	console.log("/*=============*/");
	
	var obj = {
	  link:  res.param('user'),
	  url:  "Lala-Lala",
	  text: "Lala-Lala",
	  user:   "Lala-Lala",
	  user_image_url: "Lala-Lala",
	  date: "0321654987",
	};
	
	
	saveInstagramLink(model, obj);
};



ConnectionManager.prototype.getElements = function(res,filter) {
  if( mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	
	console.log("Connected to database");
	console.log("/*=============*/");
	
	//{email:"jpgarbora@gmail.com"}
	
	model.find(filter, function(err, doc) {
		mongoose.connection.close()
		if (err) {
			return err
		}
		else {
		
			res.writeHead(200, {
				  'Content-Type': 'text/html'
			  });
			  
			  res.write(JSON.stringify(doc));
			  res.end();
		
			//console.log("elemento:-> " + conf.MONGO_URL);
		}
	});
};


function Connect()
{
	if( mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	mongoose.connection.once('connected',function(){
		console.log("Connected to database");
		console.log("/*=============*/");
		
		model = CreateModelProcessedInternetItemCollection();
		
		var obj = {link: "http://jobview.monster.com/Java-Developer-Job-Houston-TX-US-127909327.aspx", 
				date: Date.now(), 
				email: "jpgarbora@gmail.com",
				expression:"OR(OR(OR(net,pyton),OR(sharepoint,sharepoint)),OR(OR(relo,visa),OR(h1b,sponsor)))",
				match: ""
				}
		saveProcessedInternetItem(model,obj);
		
		model.find({email:"jpgarbora@gmail.com"}, function(err, doc) {
			
			mongoose.connection.close()
			
			if (err) {
				return err
			}
			else {
				
				console.log("elemento:-> " + doc);
			}
		});
		
		
	});
}


function in_array(array, id) {
    for(var i=0;i<array.length;i++) {
        return (array[i][0].id === id)
    }
    return false;
}


function CreateModelInstagramPost()
{
    //create schema for instagram weapper
	var instagram_post = new mongoose.Schema({
	  link:  String,
	  url:  String,
	  text: String,
	  user:   String,
	  user_image_url: String,
	  date: String,
	});
	
	model =  db.model("instagram_post", instagram_post);
}

function saveInstagramLink(model, instagram_post)
{
    //create new model
	var p = new model(instagram_post);

	//save model to MongoDB
	p.save(function (err) {
	  if (err) {
			console.log("/*======ERROR=======*/");
			console.log("Instagram ERROR " + err);
			return err;
	  }
	  else {
		console.log("/*=============*/");
		console.log("Instagram saved");
	  }
	});
}



function CreateModelProcessedInternetItemCollection()
{
	//create schema for blog post
	var processedInternetItemCollectionSchema = new mongoose.Schema({
	  link:  String,
	  date: {type: Date, default: Date.now},
	  email:   String,
	  expression: String,
	  match: String,
	});
	
	
	
	//compile schema to model

	model =  db.model(conf.MAIN_COLLECTION_NAME, processedInternetItemCollectionSchema);
	
	
	console.log("/*=============*/");
	console.log("processedInternetItemCollection Created!");
}
	
function saveProcessedInternetItem(model, ProcessedInternetItem)
{
	//create new model
	var p = new model(ProcessedInternetItem);

	//save model to MongoDB
	p.save(function (err) {
	  if (err) {
			console.log("/*======ERROR=======*/");
			console.log("processedInternetItem saved " + err);
			return err;
	  }
	  else {
		console.log("/*=============*/");
		console.log("processedInternetItem saved");
	  }
	});
}




module.exports = ConnectionManager;