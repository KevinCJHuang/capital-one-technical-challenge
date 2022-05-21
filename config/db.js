const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
  mongoose
    .connect(db, {
      dbName: 'test',
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Connected to MongoDB!');
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
