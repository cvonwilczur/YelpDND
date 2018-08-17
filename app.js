const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Group = require('./models/Group');
const seedDB = require('./seeds');
const Comment = require('./models/comment');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const methodOverride = require('method-override');

const commentRoutes = require('./routes/comments');
const groupRoutes = require('./routes/groups');
const indexRoutes = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost/yelpdnd')
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(express.static(__dirname+'/public'));
// seedDB();

// passport config
app.use(require('express-session')({
  secret: 'D&D is great',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

app.use(indexRoutes);
app.use('/groups', groupRoutes);
app.use('/groups/:id/comments', commentRoutes);

app.listen(3000, () => {
  console.log('Test - Server is live on port 3000');
});
