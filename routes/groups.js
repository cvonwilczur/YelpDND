const express = require('express');
const router = express.Router();
const Group = require('../models/Group');


const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

const checkGroupOwnership = (req, res, next) => {
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

router.get('/', (req, res) => {
  Group.find({}, (err, allGroups) => {
    if(err){
      console.log(err);
    } else {
      res.render('groups/index', {groups: allGroups, currentUser: req.user});
    }
  })
})

router.get('/new', isLoggedIn, (req, res) => {
  res.render('groups/new')
})

router.post('/', isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newGroup = {name: name, image: image, description: desc, author: author};
  Group.create(newGroup, (err, newlyCreated) => {
    if(err){
      console.log(err);
    } else {
      res.redirect('/groups');
    }
  })
})

router.get('/:id', (req, res) => {
  Group.findById(req.params.id).populate("comments").exec((err, foundGroup) => {
    if(err){
      console.log(err);
    } else {
      res.render('groups/show', {group: foundGroup});
    }
  })
})

//edit group routes
router.get('/:id/edit', checkGroupOwnership, (req, res) => {
    Group.findById(req.params.id, (err, foundGroup) => {
      if(err){
        res.redirect('/groups');
      }else{
        res.render('groups/edit', {group: foundGroup});
        }
    });
});

//update group route

router.put('/:id', checkGroupOwnership, (req, res) => {
  //find and update the correct groups
  Group.findByIdAndUpdate(req.params.id, req.body.group, (err, updatedGroup) => {
    if(err){
      res.redirect('/groups');
    } else {
      res.redirect('/groups/' + req.params.id);
    }
  })
  // /redirect somewhere
})

//destroy group routes
router.delete('/:id', checkGroupOwnership, (req, res) => {
  Group.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.redirect('/groups');
    } else {
      res.redirect('/groups');
    }
  });
});

module.exports = router;
