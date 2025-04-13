const Task = require('../models/tasks');

const getAllTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  task ? res.json(task) : res.status(404).json({ message: 'Task not found' });
};

const createTask = async (req, res) => {
  console.log('req.body: ', req.body)
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.update(req.body);
  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  await task.destroy();
  res.status(204).end();
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}