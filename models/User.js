const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  name: { type: String },
  roles: { type: Array }
})

UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash
      user.updated_at = new Date().toISOString()
      next()
    })
  })
})

UserSchema.methods.comparePassword = (password, dbPass, done) => {
  console.log('password', password, this)
  bcrypt.compare(password, dbPass, (err, isMatch) => {
    done(err, isMatch)
  })
}

const User = mongoose.model('User', UserSchema)
module.exports = User
