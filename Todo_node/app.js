const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const port = 5000;
const connectDB = require('./db/connect');
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json());
app.use('/api/v1/tasks', tasks);

// db connect then app start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();
