const Sequelize = require('sequelize')
const db = require('../db')

const ProductCart = db.define('productCart', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
    validate: {
      min: 0.0
    }
  }
})

module.exports = ProductCart
