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
		instagram_id: String,
	    link: String,
	    user_full_name: String,
        user_id:  String,
        user_profile_picture:  String,
        user_name: String,
        image_low_resolution:   String,
        image_standard_resolution: String,
        image_thumbnail: String,
        likes:Number,
        date:String,
        text:String,
	});

	this.init(mongoose, "instagram_post",this.documentDefinition);
}

module.exports = Model;