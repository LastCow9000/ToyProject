const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const port = 5000;
const connectDB = require('./db/connect');


// middleware
app.use(express.json());
app.use('/api/v1/tasks', tasks);

// routes
app.get('/', (req, res) => {
  res.send('To Do App');
})

// db connect then app start
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();
