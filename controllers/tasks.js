const Task = require('../models/tasks');
const { Op } = require('sequelize');

const getAllTasks = async (req, res) => {
  const {
    search,
    page = 1,
    limit = 10,
    orderBy = 'createdAt',
    order = 'DESC',
  } = req.query;
  const where = {};
  const offset = (parseInt(page) - 1) * parseInt(limit);

  if (search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  try {
    const { count, rows } = await Task.findAndCountAll({
      where,
      order: [[orderBy, order]],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const getTaskById = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  task ? res.json(task) : res.status(404).json({ message: 'Task not found' });
};

const createTask = async (req, res) => {
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