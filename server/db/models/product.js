const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://cdn.images.express.co.uk/img/dynamic/25/590x/crystal-plane-luxury-travel-715696.jpg',
    validate: {
      isUrl: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    notEmpty: true,
    validate: {
      min: 0.0
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
