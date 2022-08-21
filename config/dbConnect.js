const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);

    const todoSchema = new mongoose.Schema({
      text: String,
    });

    // Just for testing
    todoSchema.methods.whatAmI = function whatAmI() {
      const todoText = this.text ? `My todo item is: ${this.text}` : 'No todo available';
      console.log(todoText);
    };

    const Todo = mongoose.model('Todo', todoSchema);
    const newTodo = new Todo({ text: 'Walk the dog' });
    console.log(newTodo);
    // newTodo.methods.whatAmI();

    newTodo.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
