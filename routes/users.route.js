const express = require('express');

// middlewares
const { createUserValidators } = require('../middlewares/validators.middleware');
const { isUser } = require('../middlewares/users.middlewares');

// controllers
const {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
} = require('../contorllers/user.controller');

// Define child routes
const user = express.Router();

user.get('/', getAllUsers);

user.post('/', createUserValidators, createUser);

user.delete('/:id', isUser, deleteUser);

user.patch('/:id', isUser, updateUser);

module.exports = { user };