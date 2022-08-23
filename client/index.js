const form = document.getElementById('form');
const todoList = document.getElementById('todo-list');
const textInput = document.getElementById('todo-input');
const submitButton = document.getElementById('submit-todo');

textInput.focus();
form.addEventListener('submit', addNewTodo);

function addNewTodo(e) {
  fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: textInput.value }),
  })
    .then(response => {
      response.json();

      if (textInput.value.trim() !== '') {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todo-container');

        const newTodoItem = document.createElement('li');
        newTodoItem.classList.add('todo-text');
        newTodoItem.innerText = textInput.value;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', deleteTodoItem);

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', editTodoItem);

        todoContainer.appendChild(editButton);
        todoContainer.appendChild(deleteButton);
        todoContainer.appendChild(newTodoItem);

        todoList.appendChild(todoContainer);

        textInput.value = '';
        textInput.focus();
      }
    })
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));

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
