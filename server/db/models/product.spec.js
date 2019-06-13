/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a `name`, `description`, `imgUrl`, `price` and `stock`', async () => {
      const someJet = await Product.create({
        name: 'someJet',
        description: 'some expensive jet',
        imgUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH36wJ_Z-nt6cdo13tdS95XoasGEHXMQQgKwiDO3Q9-Vu327qNPA',
        price: 8000000,
        stock: 3
      })

      expect(someJet.name).to.equal('someJet')
      expect(someJet.description).to.equal('some expensive jet')
      expect(someJet.imgUrl).to.equal(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH36wJ_Z-nt6cdo13tdS95XoasGEHXMQQgKwiDO3Q9-Vu327qNPA'
      )
      expect(someJet.price).to.equal(8000000)
      expect(someJet.stock).to.equal(3)
    })
  })
})
