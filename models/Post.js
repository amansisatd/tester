const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Post
