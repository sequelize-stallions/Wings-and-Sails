const router = require('express').Router()
const {Cart} = require('../db/models')
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
    const resArr = await Cart.findOrCreate({
      where: {
        userId: req.user.id,
        orderStatus: false
      }
    })
    const cart = resArr[0]
    console.log('I FIRE!!!')
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
