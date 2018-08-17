const Group = require('../models/Group');
const Comment = require('../models/comment');


// storing all middleware here

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

middlewareObj.checkGroupOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Group.findById(req.params.id, (err, foundGroup) => {
      if(err){
        res.redirect('back');
      }else{
          if(foundGroup.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect('back');
         }
        }
    });
  } else {
    res.redirect('back');
  }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        res.redirect('back');
      }else{
          if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect('back');
         }
        }
    });
  } else {
    res.redirect('back');
  }
}

module.exports = middlewareObj
