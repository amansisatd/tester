const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

const { faker } = require('@faker-js/faker')
const moment = require('moment')
const { Op } = require('sequelize')

// Create a user massily
router.post('/users', async (req, res) => {
  const { amount = '100' } = req.query
  let start = moment()
  try {
    for (let i = 0; i < parseInt(amount); i++) {
      const user = await User.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
      })
    }
    let end = moment()
    const difference = moment(end).diff(start, 'seconds')

    res.json({
      message: `Created ${amount} users in ${difference} seconds`,
    })
  } catch (error) {
    res.json(error)
  }
})

// Create a post massily
router.post('/posts', async (req, res) => {
  const { amount = '100' } = req.query

  let start
  try {
    const users = await User.findAll({
      limit: parseInt(amount),
    })
    start = new Date()
    forEach(users, async (user) => {
      await Post.create({
        title: faker.lorem.sentence(),
        content: faker.lorem.sentences(),
        imageUrl: faker.image.url(),
        UserId: user.id,
      })
    })

    let end = new Date() - start
    const difference = moment.utc(end).format('HH:mm:ss')
    res.json({ message: `Created ${amount} posts in ${difference}` })
  } catch (error) {
    res.json(error)
  }
})

// getter
router.get('/users', async (req, res) => {
  const { limit = '100', page = '1', search, data = false, lite } = req.query

  let query = {
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
    attributes: lite ? ['id'] : undefined,
  }
  if (search) {
    query.where = {
      [Op.or]: [
        {
          firstName: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          lastName: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    }
  }
  const start = new Date()
  const users = await User.findAll(query)
  const end = new Date()
  const millis = end - start
  const seconds = millis / 1000
  res.json({
    count: users.length,
    timer: `completed in | ${millis} milliseconds | ${seconds} seconds `,
    data: data && users,
  })
})

router.get('/posts', async (req, res) => {
  const { limit = '100', page = '1', search } = req.query

  let query = {
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  }
  if (search) {
    query.where = {
      title: {
        [Op.like]: `%${search}%`,
      },
    }
  }

  const start = moment()
  const posts = await Post.findAll()
  const end = moment()
  const difference = moment(end).diff(start, 'seconds')

  res.json({
    count: posts.length,
    timer: `completed in ${difference} seconds`,
    data: posts,
  })
})

module.exports = router
