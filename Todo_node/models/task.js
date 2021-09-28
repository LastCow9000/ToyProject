const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
  name: String, complted: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);