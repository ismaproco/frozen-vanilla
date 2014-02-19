//Model Facade
//Module in charge of the instantiation of the model classes
var mongoose = require('mongoose');

var modelInstacache = require('./modelInstacache');
var modelCategories = require('./modelCategories');
var modelParameters = require('./modelParameters');
var modelCategoriesUser = require('./modelCategoriesUser');

function createModel(modelName)
{
	return mapper[modelname];
}

function ModelFacade(){};

var mapper = {};

var arr_names = [
				"modelInstacache",
				"modelCategories",
				"modelParameters",
				"modelCategoriesUser"
				];

function loadMapper()
{
	mapper[arr_names[0]] = new modelInstacache(mongoose);
	mapper[arr_names[1]] = new modelCategories(mongoose);
	mapper[arr_names[2]] = new modelParameters(mongoose);
	mapper[arr_names[3]] = new modelCategoriesUser(mongoose);
}

function operation(modelname,operation,obj)
{
	return mapper[modelname][operation](obj);
}


ModelFacade.prototype.loadMapper = loadMapper;
ModelFacade.prototype.operation = operation;
ModelFacade.prototype.names = arr_names;

/*
function init()
{
	for(var k in mapper)
	{
		if(mapper.hasOwnProperty(k))
		{
			mapper[k]["init"]();
		}
	}
}
*/

module.exports = ModelFacade;