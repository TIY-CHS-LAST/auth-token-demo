const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../config')
const moment = require('moment')

module.exports = { createToken, ensureAuthenticated }

function createToken (user) {
  const payload = {
    sub: user._id,
    user,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  }
  return jwt.sign(payload, TOKEN_SECRET)
}

function ensureAuthenticated (req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({
        message: 'Please make sure your request has an Authorization header'
      })
  }
  const token = req.headers.authorization.split(' ')[1]
  var payload = jwt.verify(token, TOKEN_SECRET)
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' })
  }
  req.user = payload.user
  next()
}
