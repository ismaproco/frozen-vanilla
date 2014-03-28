var mongoose = require('mongoose');
var conf = require('./conf');

var model;
var modelCategories;
var modelParameters;
var modelCategoriesUser;

function ConnectionManager() {}

ConnectionManager.prototype.init = function() {
	db = mongoose.connect(conf.MONGO_URL);

	mongoose.connection.once('connected', function() {
		//CreateModelProcessedInternetItemCollection();
		CreateModelInstagramPost();
		CreateModelCategories();
		CreateModelParameters();
		CreateModelCategoriesUser();
	});

};



ConnectionManager.prototype.test = function() {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	var category = {
		user_id: "1",
		instagram_id: "String",
		date: "Lilo",
		index: 1,
		votes: 3,
	};

	//create new model
	var p = new modelCategories(category);

	//save model to MongoDB
	p.save(function(err) {
		if (err) {
			console.log("/*======ERROR=======*/");
			console.log("Categories Save ERROR " + err);
			return err;
		} else {
			console.log("/*=============*/");
			console.log("Categories Save COMPLETE");
		}
	});

};

ConnectionManager.prototype.testCategoriesUser = function() {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	var categoriesUser = {
		user_id: "1",
		category_name: "Cars",
		date: Date.now() + "",
		votes: 0,
	};

	//create new model
	var p = new modelCategoriesUser(categoriesUser);

	//save model to MongoDB
	p.save(function(err) {
		if (err) {
			console.log("/*======ERROR=======*/");
			console.log("CategoriesUser Save ERROR " + err);
			return err;
		} else {
			console.log("/*=============*/");
			console.log("CategoriesUser Save COMPLETE");
		}
	});

};



ConnectionManager.prototype.saveInstagram = function(req, res) {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	console.log("/*=============*/");
	console.log("|| ConnectionManager.prototype.saveInstagram ||");
	console.log("/*=============*/");

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
	};

	saveInstagramLink(model, obj);
};



ConnectionManager.prototype.saveCategoriesUser = function(req, res) {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	console.log("/*=============*/");
	console.log("|| ConnectionManager.prototype.saveCategoriesUser ||");
	console.log("/*=============*/");

	var obj = {
		user_id: req.param('user_id'),
		category_name: req.param('category_name'),
		date: Date.now() + "",
		votes: 0,
	};

	if (typeof(obj.user_id) != "undefined" && typeof(obj.category_name) != "undefined") {
		saveCategoryUser(modelCategoriesUser, obj);
	} else {
		return "0";
	}

	return "ok " + obj.user_id + " | " + obj.category_name;
};

//===========================================
//Crud Operations with categories and Instas

ConnectionManager.prototype.updateInstaCategory = function(req, res) {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	console.log("/*=============*/");
	console.log("|| ConnectionManager.prototype.saveCategoriesUser ||");
	console.log("/*=============*/");

	var obj = {
		user_id: req.param('user_id'),
		category_name: req.param('category_name'),
		date: Date.now() + "",
		votes: 0,
	};

	if (typeof(obj.user_id) != "undefined" && typeof(obj.category_name) != "undefined") {
		saveCategoryUser(modelCategoriesUser, obj);
	} else {
		return "0";
	}

	return "ok " + obj.user_id + " | " + obj.category_name;
};

//===========================================

ConnectionManager.prototype.loadInstagram = function(req, res) {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);


	console.log("/*=============*/");
	console.log("|| ConnectionManager.prototype.loadInstagram ||");
	console.log("/*=============*/");

	var limit = req.param("l");
	var page = req.param("p");
	var current_date = req.param("cd");

	console.log("parameter: " + limit + "," + page + "," + current_date);

	var filter = {

	};


	if (typeof(current_date) != undefined && current_date != "") {
		filter = {
			"date": {
				$lte: current_date
			}
		};
	}

	if (typeof(limit) != undefined && limit != "") {
		loadInstagramLink(model, filter, res, limit, page);
	} else {
		loadInstagramLink(model, filter, res);
	}

};


ConnectionManager.prototype.loadCategoriesUser = function(req, res) {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);


	console.log("/*=============*/");
	console.log("|| ConnectionManager.prototype.loadCategoriesUser ||");
	console.log("/*=============*/");

	var user_id = req.param("ui");

	console.log("ui: " + user_id);

	var filter = {

	};

	if (typeof(user_id) != "undefined") {
		var filter = {
			"user_id": user_id
		};
	}

	loadCategoriesUser(modelCategoriesUser, filter, res);

};



ConnectionManager.prototype.getElements = function(res, filter) {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);


	console.log("/*=============*/");
	console.log("|| ConnectionManager.prototype.getElements ||");
	console.log("/*=============*/");

	//{email:"jpgarbora@gmail.com"}

	model.find(filter, function(err, doc) {
		mongoose.connection.close()
		if (err) {
			console.log("-> ERROR");
			console.log("|| ConnectionManager.prototype.getElements/->" + err);
			return err
		} else {

			res.writeHead(200, {
				'Content-Type': 'text/html'
			});

			res.write(JSON.stringify(doc));
			res.end();

			//console.log("elemento:-> " + conf.MONGO_URL);
		}
	});
};


function Connect() {
	if (mongoose.connection.readyState == 0)
		db = mongoose.connect(conf.MONGO_URL);

	mongoose.connection.once('connected', function() {
		console.log("/*=============*/");
		console.log("|| Connect ||");
		console.log("/*=============*/");

		model = CreateModelProcessedInternetItemCollection();

		var obj = {
			link: "http://jobview.monster.com/Java-Developer-Job-Houston-TX-US-127909327.aspx",
			date: Date.now(),
			email: "jpgarbora@gmail.com",
			expression: "OR(OR(OR(net,pyton),OR(sharepoint,sharepoint)),OR(OR(relo,visa),OR(h1b,sponsor)))",
			match: ""
		}
		saveProcessedInternetItem(model, obj);

		model.find({
			email: "jpgarbora@gmail.com"
		}, function(err, doc) {

			mongoose.connection.close()

			if (err) {
				return err
			} else {

				console.log("elemento:-> " + doc);
			}
		});


	});
}


function in_array(array, id) {
	for (var i = 0; i < array.length; i++) {
		return (array[i][0].id === id)
	}
	return false;
}


function CreateModelInstagramPost() {
	//create schema for instagram wrapper
	var instagram_post = new mongoose.Schema({
		instagram_id: String,
		link: String,
		user_full_name: String,
		user_id: String,
		user_profile_picture: String,
		user_name: String,
		image_low_resolution: String,
		image_standard_resolution: String,
		image_thumbnail: String,
		likes: Number,
		date: String,
		text: String,
	});

	model = db.model("instagram_post", instagram_post);
}


function CreateModelCategories() {
	//create schema for Categories wrapper
	var categories = new mongoose.Schema({
		user_id: String,
		instagram_id: String,
		date: String,
		index: Number,
		votes: Number,
	});

	modelCategories = db.model("categories", categories);
}

function CreateModelParameters() {
	//create schema for Categories wrapper
	var parameters = new mongoose.Schema({
		param_id: String,
		father_id: String,
		value: String,
		type: String,
	});

	modelParameters = db.model("parameters", parameters);
}


function CreateModelCategoriesUser() {
	//create schema for Categories wrapper
	var CategoriesUser = new mongoose.Schema({
		user_id: String,
		category_name: String,
		date: String,
		votes: Number,
	});

	modelCategoriesUser = db.model("categoriesUser", CategoriesUser);
}



function saveInstagramLink(model, instagram_post) {
	//create new model
	var p = new model(instagram_post);

	//save model to MongoDB
	p.save(function(err) {
		if (err) {
			console.log("/*======ERROR=======*/");
			console.log("Instagram ERROR " + err);
			return err;
		} else {
			console.log("/*=============*/");
			console.log("Instagram saved");
		}
	});
}

function saveCategoryUser(model, categoryUser) {
	//create new model
	var p = new model(categoryUser);

	//save model to MongoDB
	p.save(function(err) {
		if (err) {
			console.log("/*======ERROR=======*/");
			console.log("saveCategoryUser ERROR " + err);
			return err;
		} else {
			console.log("/*=============*/");
			console.log("saveCategoryUser saved");
		}
	});
}



function loadInstagramLink(model, filter, res, nlimit, page_num) {


	var page = 0;

	if (typeof(nlimit) == "undefined" || nlimit == "") {
		nlimit = 100
	};

	if (typeof(page_num) == "undefined" || page_num == "") {
		page = 0
	} else {
		page = parseInt(page_num)
	};

	var elem_skip = page * nlimit;

	model.find(filter, null, {
		sort: {
			date: -1
		},
		limit: nlimit,
		skip: elem_skip
	}, function(err, doc) {

		if (err) {
			console.log("-> ERROR");
			console.log("|| loadInstagramLink /->" + err);
			return err
		} else {
			res.write(JSON.stringify(doc));
			res.end();

			//console.log("elemento:-> " + conf.MONGO_URL);
		}
	});
}


function loadCategoriesUser(model, filter, res) {

	model.find(filter, null, {
		sort: {
			date: -1
		}
	}, function(err, doc) {

		if (err) {
			console.log("-> ERROR");
			console.log("|| loadCategoriesUser /->" + err);
			return err
		} else {
			res.write(JSON.stringify(doc));
			res.end();

			//console.log("elemento:-> " + conf.MONGO_URL);
		}
	});
}


function CreateModelProcessedInternetItemCollection() {
	//create schema for blog post
	var processedInternetItemCollectionSchema = new mongoose.Schema({
		link: String,
		date: {
			type: Date,
			default: Date.now
		},
		email: String,
		expression: String,
		match: String,
	});



	//compile schema to model

	model = db.model(conf.MAIN_COLLECTION_NAME, processedInternetItemCollectionSchema);


	console.log("/*=============*/");
	console.log("processedInternetItemCollection Created!");
}

function saveProcessedInternetItem(model, ProcessedInternetItem) {
	//create new model
	var p = new model(ProcessedInternetItem);

	//save model to MongoDB
	p.save(function(err) {
		if (err) {
			console.log("/*======ERROR=======*/");
			console.log("processedInternetItem not saved " + err);
			return err;
		} else {
			console.log("/*=============*/");
			console.log("processedInternetItem saved");
		}
	});
}



module.exports = ConnectionManager;