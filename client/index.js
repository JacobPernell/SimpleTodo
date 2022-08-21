const form = document.getElementById('form');
const todoList = document.getElementById('todo-list');
const textInput = document.getElementById('todo-input');

textInput.focus();
form.addEventListener('submit', addNewTodo);

function addNewTodo(e) {
  fetch('/api/todos', {
    method: 'POST',
  })
    .then(response => {
      response.json();
      console.log(response);
    })
    .then(data => console.log(data));

  if (textInput.value.trim() !== '') {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');

    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-text');
    newTodo.innerText = textInput.value;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', deleteTodoItem);

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', editTodoItem);

    todoContainer.appendChild(editButton);
    todoContainer.appendChild(deleteButton);
    todoContainer.appendChild(newTodo);

    todoList.appendChild(todoContainer);

    textInput.value = '';
    textInput.focus();
  }

  e.preventDefault();
}

function deleteTodoItem(e) {
  todoList.removeChild(e.target.parentElement);
}

function editTodoItem(e) {
  let selectedItem = e.target.nextSibling.nextSibling;

  const editedText = prompt(`Edit text from ${selectedItem.innerText} to:`, selectedItem.innerText);
  if (editedText.trim() != '') {
    selectedItem.innerText = editedText;
  }
}
