const mongoose = require('mongoose')
//helps create a user using the user model
const UserSchema = new mongoose.Schema({
  microsoftId: {
    type: String,
    required: true, //dont change unless you change it in the passport.js folder 
  },
  displayName: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User', UserSchema)
