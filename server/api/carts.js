const router = require('express').Router()
const {Cart, Product, ProductCart} = require('../db/models')
module.exports = router

//route for create cart
router.post('/', async (req, res, next) => {
  if (!req.user) {
    next()
  }
  try {
    await Cart.create({
      userId: req.user.id
    })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const searchCart = await Cart.findOne({
      include: [
        {
          model: Product,
          attributes: ['name', 'price', 'imgUrl', 'id']
        }
      ],
      where: {
        userId: req.user.id,
        orderStatus: false
      }
    })
    if (searchCart) res.status(200).json(searchCart)
  } catch (err) {
    next(err)
  }
})

router.post('/addProd', async (req, res, next) => {
  try {
    console.log(req.body)
    await ProductCart.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.delete('/removeProd/:id', async (req, res, next) => {
  try {
    await ProductCart.destroy({
      where: {
        productId: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Cart.update(
      {
        orderStatus: true
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const searchCart = await Cart.findAll({
      include: [
        {
          model: Product,
          attributes: ['name', 'price', 'imgUrl', 'id']
        }
      ],
      where: {
        userId: req.user.id,
        orderStatus: true
      }
    })
    if (searchCart) res.status(200).json(searchCart)
  } catch (err) {
    next(err)
  }
})

router.post('/merge', async (req, res, next) => {
  try {
    const {products, cartId} = req.body
    console.log('cartId from merge', cartId)
    products.forEach(async product => {
      await ProductCart.create({
        productId: product.id,
        cartId: cartId,
        price: product.price
      })
    })
    res.sendStatus(201)
  } catch (error) {
    next(RangeError)
  }
})
