const router = require('express').Router()
const { ensureAuthenticated } = require('./authHelpers')
router.route('/').get(ensureAuthenticated, (req, res) => {
  res.status(200).send({ status: 'ok', user: req.user })
})

module.exports = router
