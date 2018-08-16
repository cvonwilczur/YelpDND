const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/yelpdnd')
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//SCHEMA SETUP
const groupSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Group = mongoose.model('Group', groupSchema);

// Group.create(  {name: 'Phoenix Dragons', image: 'http://castlesandcooks.com/wp-content/uploads/2011/03/Dming-600x337.jpg', description: 'This groups is running Curse of Strahd currently and is around level 5.'},
//             (err, group) => {
//               if(err){
//                 console.log(err);
//               } else {
//                 console.log('Newly created group');
//                 console.log(group);
//               }
//             });

app.get('/', (req, res) => {
  res.render('landing');
})

app.get('/groups', (req, res) => {
  Group.find({}, (err, allGroups) => {
    if(err){
      console.log(err);
    } else {
      res.render('index', {groups: allGroups});
    }
  })
})

app.get('/groups/new', (req, res) => {
  res.render('new.ejs')
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
  Group.findById(req.params.id, (err, foundGroup) => {
    if(err){
      console.log(err);
    } else {
      res.render('show', {group: foundGroup});
    }
  })
})

app.listen(3000, () => {
  console.log('Test - Server is live on port 3000');
});
