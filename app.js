const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
})

app.get('/groups', (req, res) => {
  const groups = [
    {name: 'Tempe Dungeons', image: 'https://cdn.vox-cdn.com/thumbor/z7RBQFbTwOFqy31s-OmA-9G6K4U=/0x0:5026x3351/1200x800/filters:focal(2111x1274:2915x2078)/cdn.vox-cdn.com/uploads/chorus_image/image/57635507/692647154.jpg.0.jpg'},
    {name: 'Phoenix Dragons', image: 'http://castlesandcooks.com/wp-content/uploads/2011/03/Dming-600x337.jpg'},
    {name: 'Chandler Pathfinders', image: 'https://i0.wp.com/www.geeksaresexy.net/wp-content/uploads/2014/11/danddnoob.png?resize=600%2C326'}
  ]

  res.render('groups', {groups: groups});
})

app.listen(3000, () => {
  console.log('Test - Server is live on port 3000');
});
