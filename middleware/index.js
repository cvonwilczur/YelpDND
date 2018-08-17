const Group = require('../models/Group');
const Comment = require('../models/comment');


// storing all middleware here

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'You need to be logged in to do that');
  res.redirect('/login');
}

middlewareObj.checkGroupOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Group.findById(req.params.id, (err, foundGroup) => {
      if(err){
        req.flash('error', 'Group not found.');
        res.redirect('back');
      }else{
          if(foundGroup.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash('error', "You don't have permission to do that.");
          res.redirect('back');
         }
        }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        req.flash('error', 'Comment not found.');
        res.redirect('back');
      }else{
          if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash('error', "You don't have permission to do that.");
          res.redirect('back');
         }
        }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
}

module.exports = middlewareObj
