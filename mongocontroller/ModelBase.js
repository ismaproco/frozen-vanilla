//var mongoose = require('mongoose');

var conf = require('../conf');

mongoose = {};

documentElement = {};


function ModelBase(){};

ModelBase.prototype.init = function(mongoose, _entityName, documentElement)
{
	
	console.log("MONGO_URL "+ conf.MONGO_URL);
	if( mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	this.entityName = _entityName;
	this.documentElement = documentElement;
	console.log("init " + this.entityName + " " + documentElement);
	this.model = db.model(this.entityName, this.documentElement);
};

ModelBase.prototype.save = function(obj)
{
	var entityName = this.entityName;
	console.log("save " + entityName);
	
	
	//create new model
	var p = new this.model(obj);

	//save model to MongoDB
	p.save(function (err) {
	  if (err) {
			console.log(" ERROR -"+ entityName +" "+ err);
			return err;
	  }
	  else {
		console.log(" Saved - "+ entityName +" _id "+ p._id );
	  }
	});
};

ModelBase.prototype.get = function(obj)
{
	//obj.params = {sort:{_id:-1},limit:1};
	//obj.elemSkip;
	//obj.filter;
	//obj.res

	console.log("getOne:Entity - " + this.entityName);
	console.log("getOne:Model - " + typeof(this.model));
    
    this.model.find(obj.filter, null, obj.params, function(err, doc) {                
            if (err) {
                	console.log("-> ERROR");
					console.log("|| loadInstagramLink /->"+err);
                    return err
            }
            else {
            	if(obj.hasOwnProperty("res"))
            	{
            		obj.res.write(JSON.stringify(doc));
                     obj.res.end();
            	}else
            	{
            		var ljson = JSON.stringify(doc);
            		console.log("element:-> " + ljson);
            		return	ljson;
            	}
                
            }
    });

};

ModelBase.prototype.remove = function(obj)
{
	console.log("remove:Entity - " + this.entityName);
	console.log("remove:Model - " + typeof(this.model));
    var entityName = this.entityName;

    this.model.findById(obj.id, function(err, control) {
	    if (err){console.log("Error Removing "+ entityName)}
    	else{

    		if(control != null)
    		{
    			control.remove();
	    		
	    		if(obj.hasOwnProperty("res"))
	    		{
	    			obj.res.json(200, control);
	    			console.log("Remove ok");
	    		}else
	    		{
	    			console.log("Remove ok - no res");
	    		}
	    	}
    	}
	    
	  });
};

ModelBase.prototype.update = function(obj)
{
	console.log("update:Entity - " + this.entityName);
	console.log("update:Model - " + this.model);
	return "";
};


module.exports = ModelBase;