var modelBase = require("./ModelBase");

//Inhiterance of the ModelBase class
Model.prototype = new modelBase();
//Set the local method as constructor
Model.constructor = Model;


//Constructor of the class
function Model(mongoose) {
        //document definition
        this.documentDefinition = new mongoose.Schema({
                user_id: String,
                category_name: String,
                date: String,
                index: Number,
                votes: Number,
                enable: Boolean
        });

        this.mongoose = mongoose;
        this.init(mongoose, "categories", this.documentDefinition);
}

module.exports = Model;