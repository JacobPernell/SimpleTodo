require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const Todo = require('./models/todo');
const { updateOne } = require('./models/todo');

connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('client'));

app
  .route('/api/todos')
  .get(async (req, res) => {
    try {
      const todos = await Todo.find();
      res.send(todos);
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
    console.log(req.body);

    if (req.params._id != null) {
      updateOne({ _id: req.params._id }, { $set: { text: req.body.text } })
        .then(result => json(result))
        .catch(err => console.log('Error with patch:', err));
    }
  });

mongoose.connection.once('open', () => {
  app.listen(port);
});
