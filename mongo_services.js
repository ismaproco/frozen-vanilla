var mongoose = require('mongoose');
var conf = require('./conf');
var mongoController = require('./mongocontroller/ModelFacade');

var model;
var modelCategories;
var modelParameters;
var modelCategoriesUser;
var mc = {};

function ConnectionManager() {}

ConnectionManager.prototype.init = function() {
	mc = new mongoController();
	mc.loadMapper();	
};

ConnectionManager.prototype.saveInstagram = function(req,res) {

	var obj = {
	    link: req.param('link'),
	  user_full_name: req.param('user_full_name'),
        user_id:  req.param('user_id'),
        user_profile_picture:  req.param('user_profile_picture'),
        user_name: req.param('user_name'),
        image_low_resolution:   req.param('image_low_resolution'),
        image_standard_resolution: req.param('image_standard_resolution'),
        image_thumbnail: req.param('image_thumbnail'),
        likes: parseInt(req.param('likes')),
        date: req.param('date'),
        instagram_id:req.param('id'),
        text:req.param('text'),
	};

	mc.operation(mc.names[0],"save",obj);
};

ConnectionManager.prototype.saveCategoriesUser = function(req,res) {
  
	console.log("|| ConnectionManager.prototype.saveCategoriesUser ||");
	
	
	var obj = {
	    user_id:req.param('user_id'),
	    category_name:req.param('category_name'),
	    date:Date.now()+"",
	    votes:0,
	};
	
	if(typeof(obj.user_id ) != "undefined" && typeof(obj.category_name) != "undefined")
	{
		mc.operation("modelCategoriesUser","save",obj);
		//saveCategoryUser(modelCategoriesUser, obj);
	}else
	{
		return "0";
	}

	return "ok " +obj.user_id+ " | " + obj.category_name;
};


//===========================================

ConnectionManager.prototype.loadInstagram = function(req,res) {
  
	console.log("|| ConnectionManager.prototype.loadInstagram ||");

	
	var limit = req.param("l");
	var page = req.param("p");
	var current_date  = req.param("cd");
	
	console.log("parameter: " + limit + "," + page + "," + current_date);
	
	var filter = {
	    
	};
	
	
	if(typeof(current_date) != undefined && current_date != "")
    {
        filter = {"date":{$lte:current_date}};
    }
	
	if(typeof(limit) != undefined && limit != "")
    {

    	if (typeof(limit) == "undefined" || limit == "")
	    {    limit = 100
	    }else
	    {
	        limit = parseInt(limit)    
	    };
	    
	    if (typeof(page) == "undefined" || page == "")
	    {    page = 0}
	    else
	    {
	        page = parseInt(page)    
	    };
	    
	    var elem_skip = page * limit;


		var obj = {
			filter:filter,
			res:res,
			params:{sort:{date:-1},limit:limit,skip:elem_skip}
		}

		mc.operation(mc.names[0],"get",obj);
        //loadInstagramLink(model, filter,res,limit,page);
    }else
    {
    	var obj = {
			filter:filter,
			res:res,
			params:{sort:{date:-1}}
		}

		mc.operation(mc.names[0],"get",obj);
	    //loadInstagramLink(model, filter,res);
    }
	
};







function in_array(array, id) {
    for(var i=0;i<array.length;i++) {
        return (array[i][0].id === id)
    }
    return false;
}



module.exports = ConnectionManager;