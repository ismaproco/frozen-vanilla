require('nodetime').profile({
    accountKey: '53f9775d27375f89daf9ed8b4c173c963da8b770', 
    appName: 'Node.js Application'
  });

var express = require('express');
var mongo = require('./mongo_services.js');

var app = express();

var cm = new mongo();
cm.init();

app.use(express.logger());
app.use(express.static(__dirname + '/public'));



//START - Instagram Methods
app.post('/mongo',function(req,res){
    cm.saveInstagram(req,res);
});

app.get('/mongo',function(req,res){
    cm.saveInstagram(req,res);
});

app.get('/instacache_load',function(req,res){
    cm.loadInstagram(req,res);
});
//END - Instagram Methods


app.get('/removeInstaCategory',function(req,res){
    cm.removeInstaCategory(req,res);
});

//START Categories Methods

app.get('/saveCategories',function(req,res){
    cm.saveCategories(req,res);
});

app.post('/saveCategories',function(req,res){
    cm.saveCategories(req,res);
});

app.get('/loadCategoriesByUser',function(req,res){
    cm.loadCategoriesByUser(req,res);
});

app.post('/loadCategoriesByUser',function(req,res){
    cm.loadCategoriesByUser(req,res);
});

app.get('/disableCategories',function(req,res){
    cm.disableCategories(req,res);
});

app.post('/disableCategories',function(req,res){
    cm.disableCategories(req,res);
});

app.get('/removeCategories',function(req,res){
    cm.removeCategories(req,res);
});

app.post('/removeCategories',function(req,res){
    cm.removeCategories(req,res);
});


//END Categories Methods


app.get('/o/*',function(req,res){
    var operation = req.path.split("/")[2];
    //START CategoriesUser Methods
    console.log('*=*=*=*=*=*=*= o?#'+operation);
    switch(operation){
        case "loadCategoriesUserByInstagram":
            cm.loadUserCategoriesByInstagram(req,res);
        break;
        case "saveCategoriesUser":
            cm.saveCategoriesUser(req,res);
        break;
        case "updateCategoriesUser":
            cm.updateCategoriesUser(req,res);
        break;
    };
    //END CategoriesUser Methods
    


});

app.post('/o/*',function(req,res){
    var operation = req.path.split("/")[2];
    //START CategoriesUser Methods
    console.log('*=*=*=*=*=*=*= o?#'+operation);
    switch(operation){
        case "loadCategoriesUserByInstagram":
            cm.loadUserCategoriesByInstagram(req,res);
        break;
        case "saveCategoriesUser":
            cm.saveCategoriesUser(req,res);
        break;
        case "updateCategoriesUser":
            cm.updateCategoriesUser(req,res);
        break;
        default:
            res.end();
        break;
    };
    //END CategoriesUser Methods
});


app.get('/r/*',function(req,res){
    var r = req.path.split("/")[2];
    //START CategoriesUser Methods
    console.log('*=*=*=*=*=*=*= r?# '+r);
    
    res.write(r);
    res.end();

    //END CategoriesUser Methods
});

app.post('/r/*',function(req,res){
    var r = req.path.split("/")[2];
    //START CategoriesUser Methods
    console.log('*=*=*=*=*=*=*= r?# '+r);
    
    res.write(r);
    res.end();

    //END CategoriesUser Methods
});




var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});