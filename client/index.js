const form = document.getElementById('form');
const todoList = document.getElementById('todo-list');
const textInput = document.getElementById('todo-input');
const submitButton = document.getElementById('submit-todo');

submitButton.disabled = true;
textInput.addEventListener('input', validateInput);
form.addEventListener('submit', postTodoItem);
textInput.focus();

getAllTodos();

function getAllTodos() {
  fetch('/api/todos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.map(todo => {
        createNewTodoHTML(todo.text, todo._id);
      });
    });
}

function postTodoItem(e) {
  fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: textInput.value }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      createNewTodoHTML(data.text, data._id);
    })
    .catch(error => console.error('Error:', error));

  e.preventDefault();
}

function editTodoItem(e) {
  let selectedElementId = e.target.parentElement.dataset.id;
  let selectedItemText = e.target.nextSibling.nextSibling;

  const editedText = prompt(
    `Edit text from ${selectedItemText.innerText} to:`,
    selectedItemText.innerText
  );
  if (editedText.trim() != '') {
    selectedItemText.innerText = editedText;
  }

  fetch('/api/todos', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: selectedElementId, text: editedText }),
  })
    .then(response => {
      response.json();
    })
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}

function deleteTodoItem(e) {
  let selectedElementId = e.target.parentElement.dataset.id;
  todoList.removeChild(e.target.parentElement);

  fetch('/api/todos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: selectedElementId }),
  })
    .then(response => {
      response.json();
    })
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}

function validateInput() {
  submitButton.disabled = textInput.value.trim() === '';
}

function createNewTodoHTML(todoText, todoId) {
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo-container');

  if (arguments.length > 1) {
    todoContainer.dataset.id = todoId;
  }

  const fragment = new DocumentFragment();

  const newTodoItem = document.createElement('li');
  newTodoItem.classList.add('todo-text');
  newTodoItem.innerText = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', deleteTodoItem);
  deleteButton.classList.add('delete-button');

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', editTodoItem);
  editButton.classList.add('edit-button');

  todoContainer.appendChild(editButton);
  todoContainer.appendChild(deleteButton);
  todoContainer.appendChild(newTodoItem);

  fragment.appendChild(todoContainer);

  todoList.appendChild(fragment);

  textInput.value = '';
  submitButton.disabled = true;
  textInput.focus();
}
