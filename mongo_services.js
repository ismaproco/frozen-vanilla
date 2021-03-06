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

ConnectionManager.prototype.saveInstagram = function(req, res) {

	var obj = {
		link: req.param('link'),
		user_full_name: req.param('user_full_name'),
		user_id: req.param('user_id'),
		user_profile_picture: req.param('user_profile_picture'),
		user_name: req.param('user_name'),
		image_low_resolution: req.param('image_low_resolution'),
		image_standard_resolution: req.param('image_standard_resolution'),
		image_thumbnail: req.param('image_thumbnail'),
		likes: parseInt(req.param('likes')),
		date: req.param('date'),
		instagram_id: req.param('id'),
		text: req.param('text'),
		res: res,
	};

	mc.operation(mc.names[0], "save", obj);
};



//===========================================

ConnectionManager.prototype.loadInstagram = function(req, res) {

	console.log("|| ConnectionManager.prototype.loadInstagram ||");


	var limit = req.param("l");
	var page = req.param("p");
	var current_date = req.param("cd");
	var i_ids = req.param('instagram_id');

	console.log("parameter: " + limit + "," + page + "," + current_date + ',' + i_ids);

	var filter = {

	};


	if (typeof(current_date) != "undefined" && current_date != "") {
		filter = {
			"date": {
				$lte: current_date
			}
		};
	}


	/* Add category in the query of the documents */


	if (typeof(i_ids) != "undefined" && i_ids != "") {
		filter["instagram_id"] = {
			$in: i_ids.split(',')
		};
	}
	/**/

	if (typeof(limit) != undefined && limit != "") {

		if (typeof(limit) == "undefined" || limit == "") {
			limit = 100
		} else {
			limit = parseInt(limit)
		};

		if (typeof(page) == "undefined" || page == "") {
			page = 0
		} else {
			page = parseInt(page)
		};

		var elem_skip = page * limit;


		var obj = {
			filter: filter,
			res: res,
			params: {
				sort: {
					date: -1
				},
				limit: limit,
				skip: elem_skip
			}
		}

		mc.operation(mc.names[0], "get", obj);
		//loadInstagramLink(model, filter,res,limit,page);
	} else {
		var obj = {
			filter: filter,
			res: res,
			params: {
				sort: {
					date: -1
				}
			}
		}

		mc.operation(mc.names[0], "get", obj);
		//loadInstagramLink(model, filter,res);
	}

};


ConnectionManager.prototype.loadInstagramsByCategory = function(req, res) {
	console.log("|| ConnectionManager.prototype.loadInstagramsByCategory ||");

	var userId = req.param("u"); // User_id
	var category = req.param("category"); // User_id

	var limit = req.param("l");
	var page = req.param("p");
	var current_date = req.param("cd");


	console.log("parameter: u," + userId);

	var filter = {

	};

	if (typeof(current_date) != "undefined" && current_date != "") {
		filter = {
			"date": {
				$lte: current_date
			}
		};
	}

	if (!isEmptyOrUndefined(userId)) {
		filter["user_id"] = userId;
		filter["enable"] = true;
	}

	if (!isEmptyOrUndefined(category)) {

		var carr = category.split(',').map(function(x) {
			return new RegExp(x);
		});

		filter["category_id"] = {
			$in: carr
		};
	}

	if (!isEmptyOrUndefined(limit)) {
		limit = parseInt(limit);
	} else {
		limit = 25;
	}

	if (!isEmptyOrUndefined(page)) {
		page = parseInt(page);
	} else {
		page = 0;
	}

	var elem_skip = page * limit;

	var obj = {
		filter: filter,
		res: res,
		params: {
			sort: {
				date: -1
			},
			limit: limit,
			skip: elem_skip
		}
	}


	var customcall = function(element) {
		console.log("Finish HIM!!!!");

		var ins_ids = element.map(function(x) {
			return x.instagram_id
		});
		console.log("ins_ids # " + ins_ids);

		var filter = {
			instagram_id: {
				$in: ins_ids
			}
		};
		var cobj = {
			filter: filter,
			res: res,
			params: {
				sort: {
					date: -1
				}
			}
		}

		mc.operation(mc.names[0], "get", cobj);
	}


	obj.callback = customcall;


	mc.operation(mc.names[3], "get", obj);
};



//=================================================

ConnectionManager.prototype.loadCategoriesByUser = function(req, res) {

	console.log("|| ConnectionManager.prototype.loadCategoriesByUser ||");


	var userId = req.param("u"); // User_id

	console.log("parameter: u," + userId);

	var filter = {

	};


	if (!isEmptyOrUndefined(userId)) {
		filter = {
			"user_id": userId,
			'enable': true
		};
	}


	var obj = {
		filter: filter,
		res: res,
		params: {
			sort: {
				category_name: 1
			}
		}
	}

	mc.operation(mc.names[1], "get", obj);
	//loadInstagramLink(model, filter,res);
};

ConnectionManager.prototype.saveCategories = function(req, res) {

	console.log("|| ConnectionManager.prototype.saveCategories ||");

	var obj = {
		user_id: req.param('user_id'),
		category_name: req.param('category_name'),
		date: Date.now() + "",
		votes: 0,
		index: 0,
		enable: true,
		res: res,
	}

	mc.operation(mc.names[1], "save", obj);
};

ConnectionManager.prototype.removeCategories = function(req, res) {

	console.log("|| ConnectionManager.prototype.saveCategories ||");
	var cats = req.param('ids').split(',');
	console.log("---ca#" + cats);
	var obj = {
		filter: {
			'category_name': {
				$in: cats
			}
		},
		res: res,
	}

	mc.operation(mc.names[1], "removeWithFilter", obj);
};

ConnectionManager.prototype.disableCategories = function(req, res) {

	console.log("|| ConnectionManager.prototype.saveCategories ||");
	var ids = req.param('ids').split(',');
	var obj = {
		filter: {
			'category_name': {
				$in: ids
			}
		},
		res: res,
	}

	mc.operation(mc.names[1], "update", obj);
};



//=============================================



/*
//=============================================
	START User Categories Methods
//=============================================

*/
ConnectionManager.prototype.loadUserCategoriesByInstagram = function(req, res) {

	console.log("|| ConnectionManager.prototype.loadUserCategoriesByInstagram ||");


	var instagram_id = req.param("instagram_id"); // User_id

	console.log("parameter: instagram_id (u)," + instagram_id);

	var filter = {

	};


	if (!isEmptyOrUndefined(instagram_id)) {
		filter = {
			"instagram_id": instagram_id,
			'enable': true
		};
	}


	var obj = {
		filter: filter,
		res: res,
		params: {
			sort: {
				category_id: -1
			}
		}
	}

	mc.operation(mc.names[3], "get", obj);
	//loadInstagramLink(model, filter,res);
};

ConnectionManager.prototype.saveCategoriesUser = function(req, res) {

	var obj = {
		user_id: req.param('user_id'),
		category_id: req.param('category_id'),
		instagram_id: req.param('instagram_id'),
		date: Date.now() + "",
		votes: 0,
		enable: true,
		res: res,
	}

	console.log("|| - SAVE - ConnectionManager.prototype.saveCategoriesUser ||");
	mc.operation(mc.names[3], "save", obj);
};


ConnectionManager.prototype.updateCategoriesUser = function(req, res) {

	console.log("|| ConnectionManager.prototype.updateCategoriesUser ||");

	var obj = {
		filter: {
			"instagram_id": req.param('instagram_id'),
			'enable': true
		},
		operation: {
			user_id: req.param('user_id'),
			category_id: req.param('category_id'),
			instagram_id: req.param('instagram_id'),
			date: Date.now() + "",
			votes: 0,
			enable: true,
		},
		res: res,
	}

	console.log("|| - UPDATE - ConnectionManager.prototype.updateCategoriesUser ||");

	mc.operation(mc.names[3], "update", obj);


};



/*
//=============================================
	END User Categories Methods
//=============================================

*/


function isEmptyOrUndefined(obj) {
	if (typeof(obj) == "undefined" || obj == "") {
		return true;
	}

	return false;
}



function in_array(array, id) {
	for (var i = 0; i < array.length; i++) {
		return (array[i][0].id === id)
	}
	return false;
}



module.exports = ConnectionManager;