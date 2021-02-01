const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/prokect_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', () => {
    console.log('Connected to Database :: MongoDb');
})

module.exports = db;