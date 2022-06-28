const express = require('express');

// Define routes
const tasks = express.Router();

// controllers
const {
    createTask,
    getAllTasks,
    getTasksByStatus,
    updateTask,
    cancelTask
} = require('../contorllers/task.controller');

// middlewares
const { createTasksValidators, taskDateValidator } = require('../middlewares/validators.middleware');
const {
    isStatus,
    compareDate,
    isTask
} = require('../middlewares/tasks.middlewares');

tasks.post('/', createTasksValidators, createTask);

tasks.get('/', getAllTasks);

tasks.get('/:status', isStatus, getTasksByStatus);

tasks.patch('/:id', isTask, taskDateValidator, compareDate, updateTask);

tasks.delete('/:id', isTask, cancelTask);

module.exports = { tasks };