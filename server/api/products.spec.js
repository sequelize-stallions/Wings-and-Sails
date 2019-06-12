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
    const name = 'Learjet 5XR'
    const description = 'Plating.'
    const imgUrl =
      'http://www.businessair.com/sites/businessair.com/files/imagecache/classifieds_large/_mg_2807.jpg'
    const price = 409000
    const stock = 6

    beforeEach(() => {
      return Product.create({
        name,
        description,
        imgUrl,
        price,
        stock
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(name)
    })
  }) // end describe('/api/product')
}) // end describe('Product routes')
