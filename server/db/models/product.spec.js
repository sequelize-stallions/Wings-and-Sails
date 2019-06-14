/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
const Cart = db.model('cart')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a `name`, `description`, `imgUrl`, `price` and `stock`', async () => {
      const cessna = await Product.create({
        name: 'cessna',
        description: 'some expensive jet',
        imgUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH36wJ_Z-nt6cdo13tdS95XoasGEHXMQQgKwiDO3Q9-Vu327qNPA',
        price: 8000000,
        stock: 3
      })

      expect(cessna.name).to.equal('cessna')
      expect(cessna.description).to.equal('some expensive jet')
      expect(cessna.imgUrl).to.equal(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH36wJ_Z-nt6cdo13tdS95XoasGEHXMQQgKwiDO3Q9-Vu327qNPA'
      )
      expect(cessna.price).to.equal(8000000)
      expect(cessna.stock).to.equal(3)
    })
    it('`name`, `description`, `price` and `stock` are required', async () => {
      const someJet = Product.build()
      return someJet.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
    it('`description` can hold a longer string', async () => {
      const longDescription = `The Blériot XI is a French aircraft of the pioneer era of aviation. The first example was used by Louis Blériot to make the first flight across the English Channel in a heavier-than-air aircraft, on 25 July 1909. This is one of the most famous accomplishments of the pioneer era of aviation, and not only won Blériot a lasting place in history but also assured the future of his aircraft manufacturing business. The event caused a major reappraisal of the importance of aviation; the English newspaper The Daily Express led its story of the flight with the headline thar Britain is no longer an island.`

      const oldestPlane = await Product.create({
        name: 'Blériot',
        description: longDescription,
        price: 500000,
        stock: 1
      })
      expect(oldestPlane.name).to.equal('Blériot')
      expect(oldestPlane.description).to.equal(longDescription)
    })
    it('`imgUrl` should have a `dafaultValue', async () => {
      const cessna = await Product.create({
        name: 'cessna',
        description: 'some expensive jet',
        price: 8000000,
        stock: 3
      })
      expect(cessna.name).to.equal('cessna')
      expect(cessna.imgUrl).to.equal(
        'https://cdn.images.express.co.uk/img/dynamic/25/590x/crystal-plane-luxury-travel-715696.jpg'
      )
    })

    it('has a many-many relationship with Cart through `ProductCart`', async () => {
      const cessna = await Product.create({
        name: 'cessna',
        description: 'some expensive jet',
        price: 8000000,
        stock: 3
      })

      const myCart = await Cart.create({totalPrice: 777777})
      await cessna.addCart(myCart)
      const products = await myCart.getProducts()
      expect(products).to.be.an('array')
      expect(products.length).to.equal(1)
      expect(products[0].name).to.equal('cessna')
    })
  })
})
