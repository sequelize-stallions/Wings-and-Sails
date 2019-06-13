const Sequelize = require('sequelize')
const db = require('../db')

const ProductCart = db.define('productCart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0.0
    }
  }
})

module.exports = ProductCart
