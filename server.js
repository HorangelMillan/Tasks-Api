const { app } = require('./App');

// models
const { Users } = require('./models/user.model');
const { Tasks } = require('./models/task.model');

Users.hasMany(Tasks);
Tasks.belongsTo(Users, {
    foreignKey: {
        name: 'userId'
    }
});

// utils
const { db } = require('./utils/database.util');

// authenticate and sync models
db.authenticate()
    .then(() => console.log('Database is authenticated'))
    .catch(err => console.log(err));

db.sync()
    .then(() => console.log('database models synced'))
    .catch(err => console.log(err));

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});