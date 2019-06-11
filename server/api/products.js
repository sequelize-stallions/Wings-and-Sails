const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//Getting all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'imgUrl', 'description', 'stock']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//Getting one product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name', 'price', 'imgUrl', 'description', 'stock']
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
