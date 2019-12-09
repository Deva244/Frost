const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  userID: String,
  activity: String,
  type: String,
});

module.exports = mongoose.model('Activity' , activitySchema);