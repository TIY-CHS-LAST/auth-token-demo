const router = require('express').Router()
const { ensureAuthenticated } = require('./authHelpers')
router.route('/').get(ensureAuthenticated, (req, res) => {
  res.status(200).send({ status: 'ok', user: req.user })
})

function mid1 (req, res, next) {
  req.mid = { mid1: 'middleware 1' }
  console.log('mid1', req.mid)
  next()
}
function mid2 (req, res, next) {
  req.mid['mid2'] = 'middleware 2'
  console.log('mid2', req.mid)
  next()
}
function mid3 (req, res, next) {
  req.mid['mid3'] = 'middleware 3'
  console.log('mid3', req.mid)
  next()
}

router.route('/middlewaredemo').get(mid1, mid2, mid3, function (req, res) {
  console.log('the end', req.mid)
  res.json(req.mid)
})

module.exports = router
