const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // Allow frontend to talk to backend
app.use(express.json());

let tasks = [];
let id = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { text } = req.body;
  const task = { id: id++, text };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.text = req.body.text;
    res.json(task);
  } else {
    res.status(404).send();
  }
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.status(204).send();
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
