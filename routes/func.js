const { faker } = require('@faker-js/faker')
const User = require('../models/User')

// create 1 million users just by a function call
exports.createMassUsers = async () => {
  const start = new Date()
  const amount = 1000
  for (let i = 0; i < amount; i++) {
    await User.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    })
  }
  const end = new Date()
  const time_report = {
    startedAt: start,
    endedAt: end,
    difference: {
      milliseconds: end - start,
      seconds: (end - start) / 1000,
      minutes: (end - start) / 1000 / 60,
    },
  }
  console.log(time_report)
}
