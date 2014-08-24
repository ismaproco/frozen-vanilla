'use strict';

var modelBase = require("./ModelBase");

//Inhiterance of the ModelBase class
Model.prototype = new modelBase();
//Set the local method as constructor
Model.constructor = Model;


//Constructor of the class
function Model(mongoose) {
	//document definition
	this.documentDefinition = new mongoose.Schema({
		param_id: String,
		father_id: String,
		value: String,
		type: String,
	});

	this.init(mongoose, "parameters", this.documentDefinition);
}

module.exports = Model;