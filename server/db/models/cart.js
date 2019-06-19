const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
    validate: {
      min: 0
    },
    defaultValue: 0.0
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
    validate: {
      min: 0
    },
    defaultValue: 0
  },
  orderStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Cart
