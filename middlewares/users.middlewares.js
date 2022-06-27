// utils
const { catchAsync } = require('../utils/catchAsync.util');
const { appError } = require('../utils/appError');

// models
const { Users } = require('../models/user.model');

// validate if user exist
const isUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        where: {
            id
        }
    });

    if (!user) {
        return next(new appError('user not found', 404))
    };

    req.user = user;

    next()
});

module.exports = { isUser };