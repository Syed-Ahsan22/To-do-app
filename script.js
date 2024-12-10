// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToDOM);
};

// Add task to DOM
const addTaskToDOM = (taskText, id = Date.now()) => {
  const li = document.createElement('li');
  li.id = id;
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div>
      <span class="edit">Edit</span>
      <span class="delete">Delete</span>
    </div>
  `;

  taskList.appendChild(li);
};

// Save tasks to localStorage
const saveTasks = () => {
  const tasks = [...taskList.children].map(task => ({
    id: task.id,
    text: task.querySelector('.task-text').textContent
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add a new task
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  addTaskToDOM(taskText);
  saveTasks();
  taskInput.value = '';
});

// Edit or delete a task
taskList.addEventListener('click', (e) => {
  const li = e.target.closest('li');

  if (e.target.classList.contains('delete')) {
    li.remove();
    saveTasks();
  } else if (e.target.classList.contains('edit')) {
    const newText = prompt('Edit your task:', li.querySelector('.task-text').textContent);
    if (newText) {
      li.querySelector('.task-text').textContent = newText;
      saveTasks();
    }
  }
});

// Initialize tasks
loadTasks();
