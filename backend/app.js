const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for tasks
let tasks = [];

// API to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// API to add a new task
app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), text: req.body.text, done: false };
  tasks.push(task);
  res.json(task);
});

// API to toggle task status
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.map(task => 
    task.id === id ? { ...task, done: !task.done } : task
  );
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});