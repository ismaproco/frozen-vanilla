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


//START CategoriesUser Methods

app.get('loadCategoriesUserByInstagram',function(req, res){
    cm.loadUserCategoriesByInstagram(req,res);
});

app.get('saveCategoriesUser',function(req, res){
    cm.saveCategoriesUser(req,res);
});

app.post('saveCategoriesUser',function(req, res){
    cm.saveCategoriesUser(req,res);
});

//END CategoriesUser Methods

app.get('/r/*',function(req,res){
    res.write(req.path.split("/")[2]);
    res.end();
});


var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});