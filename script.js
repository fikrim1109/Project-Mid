const taskInput = document.getElementById("task");
const taskList = document.getElementById("tasks");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="completeTask(this)">Selesai</button>
            <button onclick="deleteTask(this)">Hapus</button>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = "";
    }
}

function editTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector("span").textContent;
    const updatedTask = prompt("Edit tugas:", taskText);
    if (updatedTask !== null) {
        taskItem.querySelector("span").textContent = updatedTask;
    }
}

function completeTask(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle("completed");
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}
