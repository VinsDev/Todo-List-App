document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Fetch and display tasks
    function loadTasks() {
      fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
          taskList.innerHTML = '';
          tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.done) li.classList.add('done');
            li.addEventListener('click', () => toggleTask(task.id));
            taskList.appendChild(li);
          });
        });
    }
  
    // Add a new task
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        fetch('/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        })
        .then(() => {
          input.value = '';
          loadTasks();
        });
      }
    });
  
    // Toggle task status
    function toggleTask(id) {
      fetch(`/tasks/${id}`, { method: 'PUT' })
        .then(() => loadTasks());
    }
  
    // Load tasks on page load
    loadTasks();
  });