/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  let storedProducts

  const productData = [
    {
      name: 'Yak-42',
      description: 'Some cool old and expensive plane',
      imgUrl:
        'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg',
      price: 60000000,
      stock: 5
    },
    {
      name: 'SSJ-100',
      description: 'Some plane',
      imgUrl:
        'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg',
      price: 67780000,
      stock: 5
    }
  ]

  describe('GET `/api/products/`', () => {
    beforeEach(async () => {
      beforeEach(async () => {
        await db.sync({force: true})
      })
      const createdProducts = await Product.bulkCreate(productData)
      storedProducts = createdProducts.map(product => product.dataValues)
    })

    it('sends all the products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(2)
      expect(res.body[0].name).to.be.equal(storedProducts[0].name)
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
