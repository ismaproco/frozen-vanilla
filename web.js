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


app.post('/mongo',function(req,res){
    cm.saveInstagram(req,res);
});

app.get('/mongo',function(req,res){
    cm.saveInstagram(req,res);
});


app.get('/instacache_load',function(req,res){
    cm.loadInstagram(req,res);
});

app.get('/test',function(req,res){
    cm.testCategoriesUser();
    res.end();
});

//Instagrams per Categorie
app.get('/updateInstaCategory',function(req,res){
    var result = cm.updateInstaCategory(req,res);
    res.write(result);
    res.end();
});

app.get('/removeInstaCategory',function(req,res){
    cm.removeInstaCategory(req,res);
});

//Categories per User
app.get('/saveCategoriesUser',function(req,res){
    var result = cm.saveCategoriesUser(req,res);
    res.write(result);
    res.end();
});

app.get('/loadCategoriesUser',function(req,res){
    cm.loadCategoriesUser(req,res);
});


app.get('/r/*',function(req,res){
    res.write(req.path.split("/")[2]);
    res.end();
});


var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});