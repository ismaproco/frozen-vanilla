var mongoController = require('../mongocontroller/ModelFacade');

var obj = {};

obj.filter = {"instagram_id":"632733595347668411_231432514"};
obj.limit = 1;
obj.params = {sort:{date:-1},limit:100};
obj.id = "52d46bd9b91bd30200000333";

/*
var obj = {
	param_id:"n0s-1n",
    father_id:"ns00n",
    value:"n0s1n",
    type:"n02sn",
}


mc.save(mc.names[2],obj);
*/

console.log("==============Test modelInstacache");
//console.log(mc.operation(mc.names[0],"get",obj));
console.log(mc.operation(mc.names[0],"remove",obj));
//console.log(mc.operation(mc.names[0],"get",obj));
/*console.log(mc.operation(mc.names[0],"update",obj));
*/


/*
console.log("==============Test modelCategories");
console.log(mc.operation(mc.names[1],"getOne",obj));
console.log(mc.operation(mc.names[1],"getAll",obj));
console.log(mc.operation(mc.names[1],"remove",obj));
console.log(mc.operation(mc.names[1],"update",obj));


console.log("==============Test modelParameters");
console.log(mc.operation(mc.names[2],"getOne",obj));
console.log(mc.operation(mc.names[2],"getAll",obj));
console.log(mc.operation(mc.names[2],"remove",obj));
console.log(mc.operation(mc.names[2],"update",obj));

console.log("==============Test modelCategoriesUser");
console.log(mc.operation(mc.names[3],"getOne",obj));
console.log(mc.operation(mc.names[3],"getAll",obj));
console.log(mc.operation(mc.names[3],"remove",obj));
console.log(mc.operation(mc.names[3],"update",obj));
*/