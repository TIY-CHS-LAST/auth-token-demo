const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../config')
const moment = require('moment')

module.exports = { createToken, ensureAuthenticated, checkRole }

function createToken ({ _id, name, email, roles }) {
  const payload = {
    sub: _id,
    name,
    email,
    roles,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  }
  return jwt.sign(payload, TOKEN_SECRET)
}

function checkRole (role, user) {
  return user.roles.indexOf(role) > -1
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
  const { exp, name, email, roles, _id } = jwt.verify(token, TOKEN_SECRET)
  console.log('PAYLOAD', exp, name, email, roles, _id)
  if (exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' })
  }
  req.user = { name, email, roles, _id }
  next()
}
