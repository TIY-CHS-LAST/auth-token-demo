const User = require('../models/User')
const router = require('express').Router()

router.route('/')
  .get((req, res) => {
    User.find({}, (err, users) => {
      res.send(users)
    })
  })
  .post((req, res) => {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if(existingUser) {
        return res.status(409).send({message: 'Email is already taken.'})
      }
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
      })
      user.save(() => {
        res.send({ message: 'User has been created', user })
      })
    })
  })

module.exports = router
