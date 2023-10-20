const form = document.querySelector('form');
const taskList = document.querySelector('#task-list');
const taskForm = document.querySelector("form");
const taskInput = document.getElementById("task");
const taskWarning = document.getElementById("task-warning");

taskForm.addEventListener("submit", (event) => {
  if (taskInput.value.trim() === "") {
    event.preventDefault();
    taskWarning.style.display = "inline";
  } else {
    taskWarning.style.display = "none";
  }
  
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.querySelector('#task');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = document.createElement('li');
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;
    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.textContent = 'Delete';
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(taskDeleteButton);
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    const taskText = event.target.nextElementSibling;
    if (event.target.checked) {
      taskText.classList.add('completed');
    } else {
      taskText.classList.remove('completed');
    }
  } else if (event.target.tagName === 'BUTTON') {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
  }
});
