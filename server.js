require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');

connectDB();

const app = express();
const port = 3000;

app.use(express.static('client'));

app.get('/api/todos', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/api/todos', (req, res) => {
  console.log('POST to /');
});

app.delete('/api/todos', (req, res) => {
  console.log('DELETE to /');
});

app.patch('/api/todos', (req, res) => {
  console.log('PATCH to /');
});

mongoose.connection.once('open', () => {
  app.listen(port);
});
