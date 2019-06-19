/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a `totalPrice`, `quantity` and`orderStatus`', async () => {
      const first = await Cart.create({
        totalPrice: 8000000,
        quantity: 3
      })

      expect(first.totalPrice).to.equal(8000000)
      expect(first.quantity).to.equal(3)
    })
    it('`totalPrice` and `quantity` should be greater than 0', async () => {
      const someCart = await Cart.build({
        quantity: -4,
        totalPrice: -10
      })
      return someCart.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })

    it('`totalPrice`, `quantity`,  `orderStatus` should have a `dafaultValue', async () => {
      const second = await Cart.create()
      expect(second.totalPrice).to.equal(0.0)
      expect(second.quantity).to.equal(0)
      expect(second.orderStatus).to.equal(false)
    })
  })

  describe('User/Cart association', () => {
    // defined in ../server/models/index.js
    let cart1, user1

    beforeEach(async () => {
      await db.sync({force: true})
      cart1 = await Cart.create()
      user1 = await User.create({
        email: 'user@user.com',
        password: '234'
      })
    })

    it('Cart belongs to an associated user', async () => {
      await user1.setOrders(cart1)
      const result = await Cart.findOne({
        where: {
          userId: user1.id
        }
      })
      expect(result.dataValues.id).to.equal(1)
    })
  })
})
