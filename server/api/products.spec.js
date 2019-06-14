/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const testName = 'Plain Plane'
    const testDescription = 'Plating.'
    const testImgUrl =
      'https://i.pinimg.com/originals/08/f6/a5/08f6a555b2a46a88d369dde8773d6baf.jpg'
    const testPrice = 400
    const testStock = 9

    beforeEach(() => {
      return Product.create({
        name: testName,
        description: testDescription,
        imgUrl: testImgUrl,
        price: testPrice,
        stock: testStock
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(testName)
    })
  }) // end describe('/api/product')
}) // end describe('Product routes')
