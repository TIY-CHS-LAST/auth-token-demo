const express = require('express')
const cors = require('cors')
const { MONGO_URI, TOKEN_SECRET } = require('./config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./controllers/user')
const authRoutes = require('./controllers/auth')
const protectedRoutes = require('./controllers/protected')

mongoose.connect(MONGO_URI, { useMongoClient: true })
mongoose.connection.on('error', function () {
  console.error(
    'MongoDB Connection Error. Please make sure that MongoDB is running.'
  )
})

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRoutes)
app.use('/login', authRoutes)
app.use('/protected', protectedRoutes)

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`)
})
