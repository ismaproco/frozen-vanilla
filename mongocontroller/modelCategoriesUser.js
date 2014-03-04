var modelBase = require("./ModelBase");

//Inhiterance of the ModelBase class
Model.prototype = new modelBase();
//Set the local method as constructor
Model.constructor = Model;


//Constructor of the class
function Model(mongoose)
{
	//document definition
	this.documentDefinition = new mongoose.Schema({
		    user_id:String,
		    category_id:String,
		    instagram_id:String,
		    category_name:String,
		    date:String,
		    votes:Number,
	});
	this.mongoose = mongoose;
	this.init(mongoose,"CategoriesUser",this.documentDefinition);
}

module.exports = Model;