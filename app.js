const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Group = require('./models/Group');
const seedDB = require('./seeds');
const Comment = require('./models/comment');

const app = express();

mongoose.connect('mongodb://localhost/yelpdnd')
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/public'));

seedDB();

app.get('/', (req, res) => {
  res.render('landing');
})

app.get('/groups', (req, res) => {
  Group.find({}, (err, allGroups) => {
    if(err){
      console.log(err);
    } else {
      res.render('groups/index', {groups: allGroups});
    }
  })
})

app.get('/groups/new', (req, res) => {
  res.render('groups/new')
})

app.post('/groups', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newGroup = {name: name, image: image, description: desc};
  Group.create(newGroup, (err, newlyCreated) => {
    if(err){
      console.log(err);
    } else {
      res.redirect('/groups');
    }
  })
})

app.get('/groups/:id', (req, res) => {
  Group.findById(req.params.id).populate("comments").exec((err, foundGroup) => {
    if(err){
      console.log(err);
    } else {
      res.render('groups/show', {group: foundGroup});
    }
  })
})


// COMMENTS SECTION
app.get('/groups/:id/comments/new', (req,res) => {
  Group.findById(req.params.id, (err, group) => {
    if(err){
      console.log(err);
    } else {
      res.render('comments/new', {group: group});
    }
  })
});

app.post('/groups/:id/comments', (req, res) => {
  Group.findById(req.params.id, (err, group) => {
    if(err){
      console.log(err);
      res.redirect('/groups');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if(err){
          console.log(err);
        } else {
          group.comments.push(comment);
          group.save();
          res.redirect('/groups/'+group._id);
        }
      })
    }
  })
})

app.listen(3000, () => {
  console.log('Test - Server is live on port 3000');
});
