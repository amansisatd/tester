const express = require('express')
const app = express()
const port = 1000

// connect db
const db = require('./db')

const connectDB = async () => {
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
connectDB()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// logger
const logger = require('./middlewares/logger')
app.use(logger)

// usage
const usage = require('./middlewares/usage')
app.use('/usage', usage)

// routes
const massCreate = require('./routes/mass_create')
const status = require('./routes/status')
app.use('/status', status)
app.use('/mass_create', massCreate)

// sync db
const User = require('./models/User')
const Post = require('./models/Post')
const { createMassUsers } = require('./routes/func')
User.hasMany(Post)
Post.belongsTo(User)

db.sync({ force: false, alter: true })
createMassUsers()
// listen
app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`)
})
