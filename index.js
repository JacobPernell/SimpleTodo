alert('hi');

function addNewTodo(event) {
  alert('hello');
  const newTodo = document.createElement('li');
  // newTodo.appendChild(event.)
  todoList.appendChild(newTodo);
  event.preventDefault();
}

const form = document.getElementById('form');
const todoList = document.getElementById('testTodos');
form.addEventListener('submit', addNewTodo);
