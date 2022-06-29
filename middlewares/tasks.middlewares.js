// utils
const { Tasks } = require('../models/task.model');
const { appError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync.util');

// validate if /:status is valid and send status to getTaskByStatus
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

// validate if task exist
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

// compare dates and send finishDate to updateTask with status complete/late
const compareDate = catchAsync(async (req, res, next) => {
    const { limitDate } = req.task;
    const { finishDate } = req.body;
    
    const formatDate = new Date(finishDate);

    if (Number(limitDate) >= Number(formatDate)) {
        req.task.status = 'completed'
    } else {
        req.task.status = 'late'
    };

    req.task.finishDate = formatDate;
    next();
});

module.exports = { isStatus, isTask, compareDate };