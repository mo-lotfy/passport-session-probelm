const express = require("express");
const indexRoute = express.Router();
// const app = express();
// configPassport
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
indexRoute.use(require('body-parser').urlencoded({ extended: true }));
indexRoute.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
// app.use(passport.initialize());
// app.use(passport.session());
indexRoute.use(passport.initialize());
indexRoute.use(passport.session());



// Require Post model in our routes module
let User = require("../model/user.model");

passport.use(new Strategy(
  function(username, password, done) {
    User.find({username : username}, function(err, users) {
      
      if (err) { return done(err); }
      if (!users) { return done(null, false); }
      users.forEach(user => { 
        if (user.password == password) {
          return done(null, user);
        }else{
          return done(null, false);
        }
      }); 
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);

});

passport.deserializeUser(function(id, done) {
  User.find({_id : id}, function(err, users) {
    if (err) { return done(err); }
    done(null, users);
  });
});



indexRoute.post('/login',passport.authenticate('local', { failWithError: true }),
function(req, res, next) {
  // handle success
  console.log(req.user);
  return res.json(req.user);
},
  function(err, req, res, next) {
    console.log('error');

    // handle error
    // if (req.xhr) { return res.json(err); }
    // return res.redirect('/login');
  }
);

module.exports = indexRoute;
