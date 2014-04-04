require('nodetime').profile({
    accountKey: '53f9775d27375f89daf9ed8b4c173c963da8b770',
    appName: 'Node.js Application'
});

var express = require('express');
var mongo = require('./mongo_services.js');

var app = express();

//This code is to cache the files for one day, and to compress the content
/*
app.use(express.compress());

var oneDay = 86400000;

app.use(express.static(__dirname + '/public', {
    maxAge: oneDay
}));
*/
//


/** INIT PASSPORT CODE**/

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID = "754758960704-nanjv9chdi4aj7r1p6io7t3sfrlfu8et.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "JNoxDtiofMKecXIUtgMki0Ne";

var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.


      //----------------------------------
      return done(null, profile);
    });
  }
));


/** END  PASSPORT CODE**/

var cm = new mongo();
cm.init();


/*========= app conf */

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

//ROUTES START


//**** PASSPORT ROUTES****/
/*
app.get('/', function(req, res){
  res.render('index', { user: req.user });
});*/

app.get('/account', function(req, res){
  if(typeof(req.user) == "undefined" )
  {
    res.write('{}');  
  }else
  {
    res.write('{user_id:' +req.user.id  
    +',user_name:'+req.user.displayName+'}');
  }
  
  res.end();
});

app.get('/login', function(req, res){
    //Change to use the lindex page as login
    res.redirect('/lindex.html');
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

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