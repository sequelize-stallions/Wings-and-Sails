/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
const Cart = db.model('cart')
const ProductCart = db.model('productCart')

describe('Product Cart model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a `price` and a `quantity` columns', async () => {
      const somePlane = await Product.create({
        name: 'A-321',
        description: 'Nice jet',
        price: 900000,
        stock: 19
      })
      const someCart = await Cart.create({
        totalPrice: 900000
      })

      const someOrder = await ProductCart.create({
        price: 900000,
        quantity: 3,
        productId: somePlane.id,
        cartId: someCart.id
      })

      await somePlane.addCart(someCart)

      expect(someOrder.price).to.equal(900000)
      expect(someOrder.quantity).to.equal(3)
    })

    it('is stores a `product` and a `cart` ids through many-to-many relations', async () => {
      const newPlane = await Product.create({
        name: 'Boing-777',
        description: 'A dreamliner',
        price: 10000000,
        stock: 1
      })
      const newCart = await Cart.create({
        totalPrice: 10000000
      })

      const newOrder = await ProductCart.create({
        price: 10000000,
        quantity: 1,
        productId: newPlane.id,
        cartId: newCart.id
      })

      await newPlane.addCart(newCart)

      expect(newOrder.productId).to.equal(newPlane.id)
      expect(newOrder.cartId).to.equal(newCart.id)
    })
  })
})
