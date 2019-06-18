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
    const product = await Product.findOne({
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

router.put('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    const [numberOfProducts, products] = await Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        stock: req.body.stock
      },
      {
        where: {id: productId},
        returning: true,
        plain: true
      }
    )
    res.send(products[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    await Product.destroy({
      where: {
        id: productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
