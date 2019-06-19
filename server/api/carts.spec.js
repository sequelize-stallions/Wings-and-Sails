const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Cart = db.model('cart')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET `/api/carts/`', () => {
    let cart1, cart2, cart3

    // const plane1Data = {
    //   name: 'Yak-42',
    //   description: 'Some cool old and expensive plane',
    //   imgUrl:
    //     'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg',
    //   price: 60000000,
    //   stock: 5
    // }
    // const plane2Data = {
    //   name: 'SSJ-100',
    //   description: 'Some plane',
    //   imgUrl:
    //     'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg',
    //   price: 67780000,
    //   stock: 5
    // }

    beforeEach(async () => {
      cart1 = await Cart.create()
      cart2 = await Cart.create()
      cart3 = await Cart.create({totalPrice: 777777})
      console.log(cart1)
    })

    //   it('sends all the carts', async () => {
    //     const res = await request(app)
    //       .get('/api/carts')
    //       .expect(200)
    //
    //     expect(res.body).to.be.an('array')
    //     expect(res.body).to.have.length(3)
    //     expect(res.body[2].totalPrice).to.be.equal(cart3.totalPrice)
    //   })
    // })
    // describe('GET `/api/products/:id`', () => {
    //   const plane = {
    //     name: 'Otter',
    //     description: 'Best plane for skydiving',
    //     imgUrl:
    //       'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg',
    //     price: 67780000,
    //     stock: 5
    //   }
    //   let otter
    //   beforeEach(async () => {
    //     await db.sync({force: true})
    //     otter = await Product.create(plane)
    //   })
    //   it('serves up a single Product by its `id`', async () => {
    //     const res = await request(app)
    //       .get('/api/products/1')
    //       .expect(200)
    //
    //     expect(res.body).to.be.an('object')
    //     expect(res.body.name).to.equal(otter.name)
    //   })
  })
})
