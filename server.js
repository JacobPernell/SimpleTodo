const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/', (req, res) => {
  console.log('POST to /');
});

app.delete('/', (req, res) => {
  console.log('DELETE to /');
});

app.patch('/', (req, res) => {
  console.log('PATCH to /');
});

app.listen(port);
