const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const port = 5000;


// middleware
app.use(express.json());
app.use('/api/v1/tasks', tasks)

// routes
app.get('/', (req, res) => {
  res.send('To Do App');
})



app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
})