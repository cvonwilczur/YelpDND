const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

router.get('/', (req, res) => {
  res.render('landing');
})


// AUTH ROUTES
router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render('register')
    } else {
      passport.authenticate('local')(req, res, function(){
        res.redirect('/groups');
      });
    }
  })
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', passport.authenticate('local',
 {successRedirect: '/groups',
  failureRedirect: '/login'}),
  (req, res) => {
  res.send('login logic happens here');
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/groups');
})


module.exports = router;
