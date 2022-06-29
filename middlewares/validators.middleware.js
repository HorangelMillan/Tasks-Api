const { body, validationResult } = require('express-validator');

// utils
const { appError } = require('../utils/appError');

// check if some error from validators
const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        const errorsString = errorsArray.map(error => error.msg);
        errorsString.join(', ');

        return next(new appError(errorsString, 400));
    };

    next();
};

// users validators
const createUserValidators = [
    body('name').isString().withMessage('name cannot be emty'),
    body('password')
        .isAlphanumeric().withMessage('password must contain numbers and letters')
        .isLength(8).withMessage('password must have as least 8 digits'),
    body('email').isEmail().withMessage('must provide a valid email'),
    checkResult
];

// tasks validators
const createTasksValidators = [
    body('title').notEmpty().withMessage('title cannot be empty'),
    body('userId').isNumeric().withMessage('userId should only be number'),
    body('limitDate').isISO8601({ format: 'YYYY-MM-DDTHH:MM:SSZ' }).withMessage('must provide a valid date'),
    checkResult
];

const taskDateValidator = [
    body('finishDate').isISO8601({ format: 'YYYY-MM-DDTHH:MM:SSZ' }).withMessage('must provide a valid date'),
    checkResult
];

module.exports = { createUserValidators, createTasksValidators, taskDateValidator };