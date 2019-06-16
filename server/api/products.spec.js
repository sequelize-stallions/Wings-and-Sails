/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Cart = db.model('cart')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET `/api/products/`', () => {
    let plane1, plane2

    const plane1Data = {
      name: 'Yak-42',
      description: 'Some cool old and expensive plane',
      imgUrl:
        'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg',
      price: 60000000,
      stock: 5
    }
    const plane2Data = {
      name: 'SSJ-100',
      description: 'Some plane',
      imgUrl:
        'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg',
      price: 67780000,
      stock: 5
    }

    beforeEach(async () => {
      plane1 = await Product.create(plane1Data)
      plane2 = await Product.create(plane2Data)
      const myCart = await Cart.create({totalPrice: 777777})
      await myCart.addProduct(plane1)
      await myCart.addProduct(plane2)
    })

    it('sends all the products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(2)
      expect(res.body[0].name).to.be.equal(plane1Data.name)
    })
  })
  describe('GET `/api/products/:id`', () => {
    const plane = {
      name: 'Otter',
      description: 'Best plane for skydiving',
      imgUrl:
        'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg',
      price: 67780000,
      stock: 5
    }
    let otter
    beforeEach(async () => {
      await db.sync({force: true})
      otter = await Product.create(plane)
    })
    it('serves up a single Product by its `id`', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.equal(otter.name)
    })
  })
})
