require('nodetime').profile({
    accountKey: '53f9775d27375f89daf9ed8b4c173c963da8b770',
    appName: 'Node.js Application'
});

var express = require('express');
var mongo = require('./mongo_services.js');

var app = express();

//This code is to cache the files for one day, and to compress the content
app.use(express.compress());

var oneDay = 86400000;

app.use(express.static(__dirname + '/public', {
    maxAge: oneDay
}));
//


/** INIT PASSPORT CODE**/

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: 'http://frozenvanilla.herokuapp.com/auth/google/return',
    realm: 'http://frozenvanilla.herokuapp.com/tindex.html'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

/** END  PASSPORT CODE**/

var cm = new mongo();
cm.init();

app.use(express.logger());
app.use(express.static(__dirname + '/public'));


//ROUTES START


//**** PASSPORT ROUTES****/

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));


//***********************//






//START - Instagram Methods
app.post('/mongo', function(req, res) {
    cm.saveInstagram(req, res);
});

app.get('/mongo', function(req, res) {
    cm.saveInstagram(req, res);
});

app.get('/instacache_load', function(req, res) {
    cm.loadInstagram(req, res);
});
//END - Instagram Methods


app.get('/removeInstaCategory', function(req, res) {
    cm.removeInstaCategory(req, res);
});

//START Categories Methods

app.get('/saveCategories', function(req, res) {
    cm.saveCategories(req, res);
});

app.post('/saveCategories', function(req, res) {
    cm.saveCategories(req, res);
});

app.get('/loadCategoriesByUser', function(req, res) {
    cm.loadCategoriesByUser(req, res);
});

app.post('/loadCategoriesByUser', function(req, res) {
    cm.loadCategoriesByUser(req, res);
});

app.get('/disableCategories', function(req, res) {
    cm.disableCategories(req, res);
});

app.post('/disableCategories', function(req, res) {
    cm.disableCategories(req, res);
});

app.get('/removeCategories', function(req, res) {
    cm.removeCategories(req, res);
});

app.post('/removeCategories', function(req, res) {
    cm.removeCategories(req, res);
});


//END Categories Methods


app.get('/o/*', function(req, res) {
    var operation = req.path.split("/")[2];
    //START CategoriesUser Methods
    console.log('*=*=*=*=*=*=*= o?#' + operation);
    switch (operation) {
        case "loadCategoriesUserByInstagram":
            cm.loadUserCategoriesByInstagram(req, res);
            break;
        case "saveCategoriesUser":
            cm.saveCategoriesUser(req, res);
            break;
        case "updateCategoriesUser":
            cm.updateCategoriesUser(req, res);
            break;
        case "loadInstagramsByCategory":
            console.log('pre-loaded#' + operation);
            cm.loadInstagramsByCategory(req, res);
            console.log('after-loaded#' + operation);
            break;
        default:
            res.end();
            break;
    };
    //END CategoriesUser Methods



});

app.post('/o/*', function(req, res) {
    var operation = req.path.split("/")[2];
    //START CategoriesUser Methods
    console.log('*=*=*=*=*=*=*= o?#' + operation);
    switch (operation) {
        case "loadCategoriesUserByInstagram":
            cm.loadUserCategoriesByInstagram(req, res);
            break;
        case "saveCategoriesUser":
            cm.saveCategoriesUser(req, res);
            break;
        case "updateCategoriesUser":
            cm.updateCategoriesUser(req, res);
            break;
        case "loadInstagramsByCategory":
            console.log('pre-loaded#' + operation);
            cm.loadInstagramsByCategory(req, res);
            console.log('after-loaded#' + operation);
            break;
        default:
            res.end();
            break;
    };
    //END CategoriesUser Methods
});


app.get('/r/*', function(req, res) {
    var r = req.path.split("/")[2];
    //START CategoriesUser Methods
    console.log('*=*=*=*=*=*=*= r?# ' + r);

    res.write(r);
    res.end();

    //END CategoriesUser Methods
});

app.post('/r/*', function(req, res) {
    var r = req.path.split("/")[2];
    //START CategoriesUser Methods
    console.log('*=*=*=*=*=*=*= r?# ' + r);

    res.write(r);
    res.end();

    //END CategoriesUser Methods
});



var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Listening on " + port);
});