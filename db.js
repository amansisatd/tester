const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('database_test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  // dialectOptions: {
  //   socketPath: '/var/run/mysqld/mysqld.sock',
  // },
})

module.exports = sequelize
