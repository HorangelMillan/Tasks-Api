// utils
const { Tasks } = require('../models/task.model');
const { appError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync.util');

const isStatus = catchAsync(async (req, res, next) => {
    const statusValues = [
        'active',
        'completed',
        'late',
        'cancelled'
    ];

    const indexStatus = statusValues.indexOf(req.params.status);

    if (indexStatus === -1) {
        return next(new appError(`${req.params.status} is not exist`, 404));
    };

    req.status = statusValues[indexStatus];
    next();
});

const isTask = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const task = await Tasks.findOne({
        where: {
            id,
            status: 'active'
        }
    });

    if (!task) {
        return next(new appError('Task not found or cannot update', 404));
    };

    req.task = task;
    next();
});

const compareDate = catchAsync(async (req, res, next) => {
    const { limitDate } = req.task;

    const finishDate = new Date();

    if (Number(limitDate) >= Number(finishDate)) {
        req.task.status = 'completed'
    } else {
        req.task.status = 'late'
    };

    req.task.finishDate = finishDate
    next();
});

module.exports = { isStatus, isTask, compareDate };