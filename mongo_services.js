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

ConnectionManager.prototype.saveInstagram = function(req,res) {
  if( mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	
	console.log("Connected to database");
	console.log("/*=============*/");
	
	var obj = {
	    link: req.param('link'),
	  user_full_name: req.param('user_full_name'),
        user_id:  req.param('user_id'),
        user_profile_picture:  req.param('user_profile_picture'),
        user_name: req.param('user_name'),
        image_low_resolution:   req.param('image_low_resolution'),
        image_standard_resolution: req.param('image_standard_resolution'),
        image_thumbnail: req.param('image_thumbnail'),
        date, req.param('date'),
	};
	
	saveInstagramLink(model, obj);
};

ConnectionManager.prototype.loadInstagram = function(req,res) {
  if( mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	
	console.log("Connected to database");
	console.log("/*=============*/");
	
	var limit = req.param("l");
	
	var filter = {
	    
	};
	
	if(typeof(limit) != undefined && limit != "")
    {
        loadInstagramLink(model, filter,res,limit);
    }
	
	loadInstagramLink(model, filter,res);
	
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
	    link: String,
	    user_full_name: String,
        user_id:  String,
        user_profile_picture:  String,
        user_name: String,
        image_low_resolution:   String,
        image_standard_resolution: String,
        image_thumbnail: String,
        date:String,
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

function loadInstagramLink(model, filter, res)
{
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