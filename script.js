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
  doneButton.onclick = function() {
    completeTask(task.id, li);
  };
  li.appendChild(doneButton);

  taskList.appendChild(li);
}

async function addTask() {
  const taskText = document.getElementById('task').value;
  const deadline = document.getElementById('deadline').value;
  if (taskText && deadline) {
    const task = {
      userId: 1,
      id: Date.now(),
      title: taskText,
      completed: false,
      deadline: deadline
    };

    // Simpan task ke API (untuk simulasi, sebenarnya Anda harus menggunakan metode POST ke server)
    console.log('Task Added:', task);
    
    // Tampilkan task di UI
    renderTask(task);

    // Tampilkan deadline di UI
    const displayDeadline = document.getElementById('displayDeadline');
    displayDeadline.textContent = deadline;
  }
}

function completeTask(taskId, listItem) {
  // Tandai tugas sebagai selesai di API (untuk simulasi, sebenarnya Anda harus menggunakan metode PUT/PATCH ke server)
  console.log('Task Completed:', taskId);

  // Berikan poin saat menyelesaikan tugas sekali saja
  if (!listItem.classList.contains('completed')) {
    points += 100;
    document.getElementById('points').textContent = points;
    listItem.classList.add('completed');
  }
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
