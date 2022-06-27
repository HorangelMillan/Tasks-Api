// models
const { Tasks } = require('../models/task.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util');

const createTask = catchAsync(async (req, res, next) => {
    const { title, userId, limitDate } = req.body;

    await Tasks.create({
        title,
        userId,
        limitDate: new Date(limitDate)
    });

    res.status(200).json({
        status: 'success'
    });
});

const getAllTasks = catchAsync(async (req, res, next) => {
    const tasks = await Tasks.findAll();

    res.status(200).json({
        status: 'success',
        tasks
    });
});

const getTasksByStatus = catchAsync(async (req, res, next) => {
    const { status } = req;

    const tasks = await Tasks.findAll({
        where: {
            status
        }
    });

    if (!tasks[0]) {
        return res.status(404).json({
            status: 'error',
            message: `havent ${status} tasks to show here`
        });
    };

    res.status(200).json({
        status: 'success',
        tasks
    });
});

const updateTasks = catchAsync(async (req, res, next) => {
    const { status, id, finishDate } = req.task;

    await Tasks.update({
        status,
        finishDate
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success',
    });
});

const cancelTask = catchAsync(async (req,res, next) => {
    const { id } = req.task;

    await Tasks.update({
        status: 'cancelled'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

module.exports = { createTask, getAllTasks, getTasksByStatus, updateTasks, cancelTask };
