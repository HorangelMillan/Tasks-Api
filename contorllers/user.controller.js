// utils
const { catchAsync } = require('../utils/catchAsync.util');

// models
const { Users } = require('../models/user.model');

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await Users.findAll();

    res.status(200).json({
        status: 'success',
        users
    });
});

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    await Users.create({
        name,
        email,
        password
    });

    res.status(200).json({
        status: 'success'
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    await Users.update({
        status: 'disabled'
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'successs'
    });
});

const updateUser = catchAsync(async (req,res, next) => {
    const { id } = req.user;
    const { name, email } = req.body;

    await Users.update({
        name,
        email
    }, {
        where: {
            id
        }
    });

    res.status(200).json({
        status: 'success'
    });
});

module.exports = { getAllUsers, createUser, deleteUser, updateUser };