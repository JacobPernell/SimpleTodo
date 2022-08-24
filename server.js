require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const Todo = require('./models/todo');

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
  .delete(async (req, res) => {
    try {
      await Todo.deleteOne({ _id: req.body._id }).then(result => {
        res.json(result);
      });
    } catch (err) {
      console.log('Error with delete:', err);
    }
  })
  .patch(async (req, res) => {
    try {
      await Todo.updateOne({ _id: req.body._id }, { $set: { text: req.body.text } }).then(
        result => {
          res.json(result);
        }
      );
    } catch (err) {
      console.log('Error with patch:', err);
    }
  });

mongoose.connection.once('open', () => {
  app.listen(port);
});
