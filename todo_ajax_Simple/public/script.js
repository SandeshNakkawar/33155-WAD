const API_URL = 'http://localhost:3000/tasks';

window.onload = function () {
  loadTasks();
};

function loadTasks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById('taskList');
      list.innerHTML = '';
      tasks.forEach(task => {
        list.innerHTML += `
          <li id="task-${task.id}">
            <input type="text" value="${task.text}" onchange="updateTask(${task.id}, this.value)">
            <button onclick="deleteTask(${task.id})">Delete</button>
          </li>
        `;
      });
    });
}

function addTask() {
  const input = document.getElementById('newTask');
  const text = input.value.trim();
  if (text === '') return;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(() => {
      input.value = '';
      loadTasks();
    });
}

function updateTask(id, newText) {
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText })
  }).then(loadTasks);
}

function deleteTask(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then(loadTasks);
}
