const mongoose = require('mongoose')
const router = require('express').Router()
const User = require('../models/User')
const { createToken } = require('./authHelpers')
// login
router.route('/').post((req, res) => {
  User.findOne({ email: req.body.email }, '+password', function (
    err,
    user,
    next
  ) {
    console.log('user******', user)
    if (err) return next(err)
    if (!user) {
      console.log('in here')
      return res.status(401).send({ message: 'Wrong email and/or password' })
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      console.log('is match', isMatch)
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email and/or password' })
      }
      res.send({ token: createToken(user) })
    })
  })
})

module.exports = router
