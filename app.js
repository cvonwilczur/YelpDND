const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('This will be a landing page soon.');
})

app.get('/groups', (req, res) => {
  res.send('Similarly, this will be a group page soon.');
})

app.listen(3000, () => {
  console.log('Test - Server is live on port 3000');
});
