const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

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
      req.flash('error', err.message);
      return res.render('register')
    } else {
      req.flash('success', 'Welcome to YelpD&D');
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
  req.flash('success', 'Logged you out');
  res.redirect('/groups');
})


module.exports = router;
