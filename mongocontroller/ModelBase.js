var conf = require('../conf');
mongoose = {};
documentElement = {};

function ModelBase() {}

ModelBase.prototype.dbStatus = {status:"not connected"};

ModelBase.prototype.init = 
            function(mongoose, _entityName, documentElement, callback) {
    console.log("MONGO_URL " + conf.MONGO_URL);
    
    var $me = this;

    this.entityName = _entityName;
    this.documentElement = documentElement;

    if (mongoose.connection.readyState === 0)
    {
        db = mongoose.connect(conf.MONGO_URL);
    }

    var db = mongoose.connection;
    
    db.on('error', function(){ 
    	$me.dbStatus = {status:"error"};
    	callback({status:"error"});
    });

    db.once('open',function(){
    	//Set of the database model
        $me.model = this.model(_entityName, documentElement,_entityName);
        $me.dbStatus = {status:"ok"};
        //callback execution
		callback({status:"ok"});        
    })
};

ModelBase.prototype.save = function(obj) {
    //create new model
    var p = new this.model(obj);

    //save model to MongoDB
    p.save(function(err) {
        if (err) {
            obj.result = {status:"error",message:err};
        } else {
            obj.result = {status:"ok",id:p._id};            
        }

        if (obj.hasOwnProperty("res")) {
            obj.res.end();
        }

        if (obj.hasOwnProperty("callback")) {
            obj.callback(obj.result);
        }
    });

    return;
};

ModelBase.prototype.get = function(obj) {
    var result;

    this.model.find(obj.filter, null, obj.params, function(err, doc) {

        if (err) {
            if (obj.hasOwnProperty("res")) {
                obj.res.end();
            }
            result = {error:err}
        } 
        else {
            if (obj.hasOwnProperty("res")) {
                obj.res.write(JSON.stringify(doc));
                obj.res.end();
            } 
			result = doc;
        }

		if (obj.hasOwnProperty("callback")) {
            obj.callback(result);
        }
    });

    return result;
};

ModelBase.prototype.remove = function(obj) {
    
    var result = {status:"no action"};

    this.model.findById(obj.id, function(err, control) {

        if (err) 
        {
            if (obj.hasOwnProperty("res")) 
            {
                obj.res.end();
            }

            result.status = "error: " + error;
        } 
        else 
        {
            if (control !== null) 
            {
                control.remove();

                result.status = "ok";

                if (obj.hasOwnProperty("res")) 
                {
                    obj.res.json(200, control);
                    obj.res.end();
                }
            }

            if( obj.hasOwnProperty( "callback" ) )
            {
                obj.callback( result );
            }

        }
    });
};


ModelBase.prototype.removeWithFilter = function(obj) {
    
    var result = {status: "no action"};

    this.model.remove(obj.filter, function(err) {
        
        if (err) 
        {
            if (obj.hasOwnProperty("res")) {
                obj.res.end();
            }

            result = {status:"error",message:err};
        } 
        else 
        {
            if (obj.hasOwnProperty("res")) {
                obj.res.end();
            }

            result = {status:"ok"};
        }

        //Execute the callback
        if( obj.hasOwnProperty( "callback" ) )
        {
        	obj.callback( result );
        }
    });
};

ModelBase.prototype.count = function(obj) {

    this.model.count({},
        function(err,count){
            if (obj.hasOwnProperty("res") && !err) 
            {
                if (obj.hasOwnProperty("callback")) 
                {
                    obj.callback(count);
                } 
                else 
                {
                    obj.res.write( JSON.stringify( count ) );
                    obj.res.end();
                }
            } 
            else
            {
                var ljson = JSON.stringify( count ) ;

                if (obj.hasOwnProperty("callback")) 
                {
                    obj.callback( JSON.stringify( ljson ) );
                }
                else
                {
                    return ljson;
                }
            }        
        }); 
};


var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}



ModelBase.prototype.update = function(obj) {

    var result = {status:"no action"};

    this.model.update( obj.filter, obj.operation, { multi: true }, 
        function(err, numberAffected, raw) {
        
        if (err)
        {
            if (obj.hasOwnProperty("res")) 
            {
                obj.res.end();
            }

            result.status = "error: " + error;
        }
        else
        {
            if (obj.hasOwnProperty("res")) {
                obj.res.end();
            }

            result.status = "ok";
            result.numberAffected = numberAffected;
        }

        if( obj.hasOwnProperty( "callback" ) )
        {
            obj.callback(result);
        }

    });
};

ModelBase.prototype.custom = function(obj) {
    console.log("obj.name -> " + obj.name);
    
    this.model.find({}, function(err, data) { 
                            console.log(err, data, data.length); 
                        });
};

module.exports = ModelBase;


// ****************************************************************************