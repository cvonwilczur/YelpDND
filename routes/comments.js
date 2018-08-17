const express = require('express');
const router = express.Router({mergeParams: true});
const Group = require('../models/Group');
const Comment = require('../models/comment');
const middleware = require('../middleware/index.js');

// COMMENTS SECTION

//comments NEW
router.get('/new', middleware.isLoggedIn, (req,res) => {
  Group.findById(req.params.id, (err, group) => {
    if(err){
      console.log(err);
    } else {
      res.render('comments/new', {group: group});
    }
  })
});

// Comments CREATE
router.post('/', middleware.isLoggedIn, (req, res) => {
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
});

// comments edit route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if(err){
      res.redirect('back');
    } else {
      res.render('comments/edit', {group_id: req.params.id, comment: foundComment})
    }
  })
});

// comments update
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if(err) {
      res.redirect('back');
    } else {
      res.redirect('/groups/' + req.params.id);
    }
  })
})

//comments destroy

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if(err){
    res.redirect('back');
  } else {
    req.flash('success', 'Comment successfully deleted');
    res.redirect('/groups/' +req.params.id)
  }
})
})

module.exports = router;
