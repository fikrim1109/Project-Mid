const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const imageApiUrl = 'https://api.unsplash.com/photos/random?count=5&client_id=YOUR_UNSPLASH_ACCESS_KEY';

let points = 0;

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

function renderTask(task) {
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  
  // Nama tugas
  const taskName = document.createElement('span');
  taskName.textContent = task.title;
  li.appendChild(taskName);
  
  // Deadline
  const deadline = document.createElement('span');
  deadline.textContent = ` (Deadline: ${task.deadline})`;
  deadline.style.fontStyle = 'italic';
  deadline.style.marginLeft = '10px'; // Pisahkan dengan margin kiri
  li.appendChild(deadline);
  
  // Done button
  const doneButton = document.createElement('button');
  doneButton.textContent = 'Done';
  doneButton.className = 'done-button'
  doneButton.onclick = function() {
    completeTask(task.id, li);
  };
  li.appendChild(doneButton);

  taskList.appendChild(li);

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-button';
  deleteButton.onclick = function() {
    deleteTask(task.id, li, task.deadline);
  };
  li.appendChild(deleteButton);
  
  taskList.appendChild(li);
}

// Fungsi untuk menambahkan task dan tanggal ke localStorage
async function addTask() {
  const taskText = document.getElementById("task").value;
  const deadline = document.getElementById("deadline").value;

  // Periksa apakah tanggal yang dimasukkan adalah tanggal valid
  if (taskText && deadline && !isNaN(Date.parse(deadline))) {
    // Simpan data ke localStorage
    const task = {
      userId: 1,
      id: Date.now(),
      title: taskText,
      completed: false,
      deadline: deadline,
    };

    // Menyimpan data ke localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Tampilkan task di UI
    renderTask(task);

    // Tampilkan tanggal paling kecil dari localStorage di UI
    displaySmallestDeadline();
  } else {
    alert("Invalid task or deadline input. Please enter both task and valid deadline.");
  }
}

localStorage.clear();

// Fungsi untuk menampilkan tanggal paling kecil dari localStorage di UI
function displaySmallestDeadline() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Urutkan tasks berdasarkan deadline (tanggal paling kecil)
  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  // Ambil tanggal paling kecil
  const smallestDeadline = tasks.length > 0 ? tasks[0].deadline : "No tasks with valid deadlines";

  // Tampilkan tanggal paling kecil di UI
  const displayDeadline = document.getElementById("displayDeadline");
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  displayDeadline.textContent = new Date(smallestDeadline).toLocaleDateString(undefined, options);
}

function completeTask(taskId, listItem) {
  // Tandai tugas sebagai selesai di API (untuk simulasi, sebenarnya Anda harus menggunakan metode PUT/PATCH ke server)
  console.log('Task Completed:', taskId);
  listItem.remove();

  // Hapus task dari localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Berikan poin saat menyelesaikan tugas sekali saja
  if (!listItem.classList.contains('completed')) {
    points += 100;
    document.getElementById('points').textContent = points;
    listItem.classList.add('completed');
  }

  // Urutkan ulang tanggal yang tersisa setelah menghapus task
  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Tampilkan tanggal paling kecil dari localStorage di UI
  displaySmallestDeadline();
}

async function redeemPoints() {
  if (points >= 100) {
    // Tukar poin dengan gambar dari API Unsplash
    const images = await fetchData(imageApiUrl);
    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = '';
    images.forEach(image => {
      const img = document.createElement('img');
      img.src = image.urls.small;
      imagesContainer.appendChild(img);
    });

    // Kurangi poin
    points -= 100;
    document.getElementById('points').textContent = points;
  } else {
    alert('Not enough points to redeem.');
  }
}

// Fungsi untuk memuat tugas dari localStorage saat halaman dimuat
window.onload = function() {
  displaySmallestDeadline();
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    renderTask(task);
  });
};

function deleteTask(taskId, listItem) {
  // Hapus task dari localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Hapus listItem dari UI
  listItem.remove();

  // Urutkan ulang tanggal yang tersisa setelah menghapus task
  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Tampilkan tanggal paling kecil dari localStorage di UI
  displaySmallestDeadline();
}
