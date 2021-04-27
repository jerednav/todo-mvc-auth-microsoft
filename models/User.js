const mongoose = require('mongoose')
//helps create a user using the user model
const UserSchema = new mongoose.Schema({
  microsoftId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User', UserSchema)
