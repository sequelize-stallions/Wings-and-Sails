const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//Getting all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      //not sure if we need everything,
      //but we're including just in case
      attributes: [
        'id',
        'firstName',
        'lastName',
        'address',
        'email',
        'password',
        // 'salt',
        // 'googleId',
        'admin'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
