const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://tin:1234@node-express-toy.0kxrd.mongodb.net/TODO_NODE?retryWrites=true&w=majority'


const connectDB = (url) => {
  return mongoose.connect(connectionString);
}

module.exports = connectDB;