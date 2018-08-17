const express = require('express');
const router = express.Router({mergeParams: true});
const Group = require('../models/Group');
const Comment = require('../models/comment');


const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}


// COMMENTS SECTION

//comments NEW
router.get('/new', isLoggedIn, (req,res) => {
  Group.findById(req.params.id, (err, group) => {
    if(err){
      console.log(err);
    } else {
      res.render('comments/new', {group: group});
    }
  })
});

// Comments CREATE
router.post('/', isLoggedIn, (req, res) => {
  Group.findById(req.params.id, (err, group) => {
    if(err){
      console.log(err);
      res.redirect('/groups');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err){
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          group.comments.push(comment);
          group.save();
          res.redirect('/groups/'+group._id);
        }
      })
    }
  })
})


module.exports = router;
