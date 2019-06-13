const router = require('express').Router()
const {Cart, Product, ProductCart} = require('../db/models')
module.exports = router

function isAuthenticated(req, res, next) {
  // // do any checks you want to in here
  // console.log(req.user)
  // // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // // you can do this however you want with whatever variables you set up
  // if (req.user.authenticated){
  //   console.log('I FIRED IN IF!!!!')
  //     return next();
  // }
  // console.log('I FIRED NEXT')
  // // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  // res.redirect('/home');
}

router.post('/', async (req, res, next) => {
  if (!req.user) {
    next()
  }
  try {
    await Cart.findOrCreate({
      where: {
        userId: req.user.id,
        orderStatus: false
      }
    })
    console.log('I FIRE!!!')
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
          attributes: ['name', 'price', 'imgUrl']
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
