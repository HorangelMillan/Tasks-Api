const express = require('express');

// Routers
const { user } = require('./routes/users.route');
const { tasks } = require('./routes/tasks.route');

// Init express
const app = express();

// Middlewares
app.use(express.json());

// define main routes 
app.use('/api/v1/users', user);
app.use('/api/v1/tasks', tasks);

// Global Error handler
app.use('*', (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        err,
        stack: err.stack
    });

});

module.exports = { app };