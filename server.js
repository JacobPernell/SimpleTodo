require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const Todo = require('./models/todo');

connectDB();

const app = express();
const port = 3000;

app.use(express.raw());
app.use(express.static('client'));

app
  .route('/api/todos')
  .get((req, res) => {
    try {
      res.sendFile(path.join(__dirname + '/views/index.html'));
      const todos = Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    const todo = new Todo({
      text: req.body.text,
    });
    try {
      const newTodo = await todo.save();
      console.log(newTodo);
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(400);
    }
  })
  .delete((req, res) => {
    console.log('DELETE to /');
  })
  .patch((req, res) => {
    console.log('PATCH to /');
  });

mongoose.connection.once('open', () => {
  app.listen(port);
});
